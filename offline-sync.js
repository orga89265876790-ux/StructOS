const DATABASE_NAME = 'structos-offline-sync-v1';
const DATABASE_VERSION = 1;
const SNAPSHOT_STORE = 'snapshots';
const OUTBOX_STORE = 'outbox';
const META_STORE = 'meta';
const CONFLICT_STORE = 'conflicts';

const DEFAULT_WATCH_INTERVAL = 15000;

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB request failed'));
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('IndexedDB transaction failed'));
    transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
  });
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in globalThis)) {
      reject(new Error('IndexedDB is not available'));
      return;
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(SNAPSHOT_STORE)) {
        database.createObjectStore(SNAPSHOT_STORE, { keyPath: 'category' });
      }
      if (!database.objectStoreNames.contains(OUTBOX_STORE)) {
        const outbox = database.createObjectStore(OUTBOX_STORE, { keyPath: 'category' });
        outbox.createIndex('updatedAt', 'updatedAt');
      }
      if (!database.objectStoreNames.contains(META_STORE)) {
        database.createObjectStore(META_STORE, { keyPath: 'key' });
      }
      if (!database.objectStoreNames.contains(CONFLICT_STORE)) {
        const conflicts = database.createObjectStore(CONFLICT_STORE, { keyPath: 'id' });
        conflicts.createIndex('category', 'category');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Offline database could not be opened'));
  });
}

function fingerprint(value) {
  const source = JSON.stringify(value);
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${source.length}-${(hash >>> 0).toString(16)}`;
}

function deviceId() {
  const key = 'structos-device-id-v1';
  let value = localStorage.getItem(key);
  if (value) return value;
  value = globalThis.crypto?.randomUUID?.() || `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(key, value);
  return value;
}

function normalizeSelection(selection, availableCategories) {
  const allowed = new Set(availableCategories);
  const requested = Array.isArray(selection) && selection.length ? selection : availableCategories;
  return [...new Set(requested)].filter((category) => allowed.has(category));
}

/**
 * Offline-first client contract.
 *
 * Server is authoritative. Device data is the working copy. The outbox keeps
 * local mutations until the server acknowledges them. A transport may be
 * attached later without changing the UI or the local persistence layer.
 *
 * Expected transport methods:
 * - isAvailable(context) -> boolean
 * - push(records, context) -> { accepted?: [{ category, fingerprint, revision }], conflicts?: [] }
 * - pull(cursor, context) -> { records?: [], cursor?: string }
 */
export function createOfflineSyncEngine({
  categories,
  collectCategory,
  countSubsections,
  applyServerRecord,
  transport = null,
  watchInterval = DEFAULT_WATCH_INTERVAL
}) {
  const availableCategories = [...new Set(categories || [])];
  const events = new EventTarget();
  const currentDeviceId = deviceId();
  let databasePromise;
  let initialized = false;
  let watchTimer;
  let activeSyncPromise;
  let syncTransport = transport;
  let state = {
    online: navigator.onLine,
    syncing: false,
    phase: navigator.onLine ? 'checking' : 'offline',
    pendingCount: 0,
    pendingSubsectionCount: 0,
    conflictCount: 0,
    lastLocalSaveAt: null,
    lastSyncAt: null,
    deviceReady: false,
    persistent: false,
    cloudAvailable: false,
    error: null
  };

  const database = () => {
    databasePromise ||= openDatabase();
    return databasePromise;
  };

  function publish(patch = {}) {
    state = { ...state, ...patch };
    events.dispatchEvent(new CustomEvent('statechange', { detail: { ...state } }));
  }

  async function getMeta(key, fallback = null) {
    const db = await database();
    const transaction = db.transaction(META_STORE, 'readonly');
    const record = await requestResult(transaction.objectStore(META_STORE).get(key));
    return record?.value ?? fallback;
  }

  async function setMeta(key, value) {
    const db = await database();
    const transaction = db.transaction(META_STORE, 'readwrite');
    transaction.objectStore(META_STORE).put({ key, value });
    await transactionDone(transaction);
  }

  async function readStore(storeName) {
    const db = await database();
    const transaction = db.transaction(storeName, 'readonly');
    return requestResult(transaction.objectStore(storeName).getAll());
  }

  async function refreshCounts() {
    const [pending, conflicts] = await Promise.all([readStore(OUTBOX_STORE), readStore(CONFLICT_STORE)]);
    const pendingSubsectionCount = pending.reduce((total, record) => {
      if (typeof countSubsections !== 'function') return total;
      try {
        const count = Number(countSubsections(record.category, record.payload));
        return total + (Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0);
      } catch {
        return total;
      }
    }, 0);
    publish({ pendingCount: pending.length, pendingSubsectionCount, conflictCount: conflicts.length });
    return { pending, conflicts };
  }

  async function capture(selection, { enqueue = true, reason = 'automatic' } = {}) {
    const chosen = normalizeSelection(selection, availableCategories);
    if (!chosen.length) return { saved: [], unchanged: [] };

    const collected = [];
    for (const category of chosen) {
      const payload = await collectCategory(category);
      collected.push({ category, payload, fingerprint: fingerprint(payload) });
    }

    const db = await database();
    const existing = await readStore(SNAPSHOT_STORE);
    const existingByCategory = new Map(existing.map((record) => [record.category, record]));
    const now = new Date().toISOString();
    const saved = [];
    const unchanged = [];
    const transaction = db.transaction([SNAPSHOT_STORE, OUTBOX_STORE, META_STORE], 'readwrite');
    const snapshots = transaction.objectStore(SNAPSHOT_STORE);
    const outbox = transaction.objectStore(OUTBOX_STORE);
    const meta = transaction.objectStore(META_STORE);

    collected.forEach((record) => {
      const previous = existingByCategory.get(record.category);
      if (previous?.fingerprint === record.fingerprint) {
        unchanged.push(record.category);
        return;
      }
      const snapshot = {
        ...record,
        deviceId: currentDeviceId,
        updatedAt: now,
        source: 'device'
      };
      snapshots.put(snapshot);
      if (enqueue) {
        outbox.put({
          ...snapshot,
          baseRevision: previous?.serverRevision ?? null,
          reason,
          attempts: 0
        });
      }
      saved.push(record.category);
    });
    meta.put({ key: 'lastLocalSaveAt', value: now });
    meta.put({ key: 'deviceReady', value: true });
    await transactionDone(transaction);

    publish({ lastLocalSaveAt: now, deviceReady: true, error: null });
    await refreshCounts();
    return { saved, unchanged };
  }

  async function requestPersistentStorage() {
    if (!navigator.storage?.persisted) return false;
    let persistent = await navigator.storage.persisted();
    if (!persistent && navigator.storage.persist) persistent = await navigator.storage.persist();
    publish({ persistent });
    return persistent;
  }

  async function transportAvailable() {
    if (!syncTransport) return false;
    try {
      return typeof syncTransport.isAvailable === 'function'
        ? Boolean(await syncTransport.isAvailable({ deviceId: currentDeviceId }))
        : true;
    } catch {
      return false;
    }
  }

  async function acknowledge(records = []) {
    if (!records.length) return;
    const db = await database();
    const pending = await readStore(OUTBOX_STORE);
    const pendingByCategory = new Map(pending.map((record) => [record.category, record]));
    const transaction = db.transaction([OUTBOX_STORE, SNAPSHOT_STORE], 'readwrite');
    const outbox = transaction.objectStore(OUTBOX_STORE);
    const snapshots = transaction.objectStore(SNAPSHOT_STORE);
    records.forEach((accepted) => {
      const queued = pendingByCategory.get(accepted.category);
      if (!queued || (accepted.fingerprint && queued.fingerprint !== accepted.fingerprint)) return;
      outbox.delete(accepted.category);
      snapshots.put({
        ...queued,
        source: 'server',
        serverRevision: accepted.revision ?? queued.serverRevision ?? null,
        syncedAt: new Date().toISOString()
      });
    });
    await transactionDone(transaction);
  }

  async function rememberConflicts(records = []) {
    if (!records.length) return;
    const db = await database();
    const transaction = db.transaction(CONFLICT_STORE, 'readwrite');
    const store = transaction.objectStore(CONFLICT_STORE);
    records.forEach((record) => store.put({
      ...record,
      id: record.id || `${record.category}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      detectedAt: record.detectedAt || new Date().toISOString()
    }));
    await transactionDone(transaction);
  }

  async function applyPulledRecords(records = []) {
    if (!records.length) return;
    const db = await database();
    const pending = await readStore(OUTBOX_STORE);
    const pendingCategories = new Set(pending.map((record) => record.category));
    const cleanRecords = records.filter((record) => !pendingCategories.has(record.category));
    const collisions = records.filter((record) => pendingCategories.has(record.category));

    if (collisions.length) {
      await rememberConflicts(collisions.map((serverRecord) => ({
        category: serverRecord.category,
        serverRecord,
        type: 'unacknowledged-local-change'
      })));
    }

    for (const record of cleanRecords) {
      if (typeof applyServerRecord === 'function') await applyServerRecord(record.category, record.payload);
    }

    if (cleanRecords.length) {
      const transaction = db.transaction(SNAPSHOT_STORE, 'readwrite');
      const snapshots = transaction.objectStore(SNAPSHOT_STORE);
      cleanRecords.forEach((record) => snapshots.put({
        category: record.category,
        payload: record.payload,
        fingerprint: fingerprint(record.payload),
        deviceId: currentDeviceId,
        source: 'server',
        serverRevision: record.revision ?? null,
        updatedAt: record.updatedAt || new Date().toISOString(),
        syncedAt: new Date().toISOString()
      }));
      await transactionDone(transaction);
    }
  }

  async function runSync(selection, { automatic = false } = {}) {
    if (activeSyncPromise) return activeSyncPromise;
    const chosen = normalizeSelection(selection, availableCategories);
    activeSyncPromise = (async () => {
      publish({ syncing: true, phase: 'saving-device', error: null, online: navigator.onLine });
      try {
        const captured = await capture(chosen, { enqueue: true, reason: automatic ? 'automatic' : 'manual' });
        if (!navigator.onLine) {
          publish({ syncing: false, phase: 'offline', cloudAvailable: false });
          return { ...captured, cloud: false, offline: true };
        }

        const available = await transportAvailable();
        publish({ cloudAvailable: available });
        if (!available) {
          publish({ syncing: false, phase: 'device-ready' });
          return { ...captured, cloud: false, offline: false };
        }

        publish({ phase: 'pushing' });
        const pending = (await readStore(OUTBOX_STORE)).filter((record) => chosen.includes(record.category));
        if (pending.length) {
          const result = await syncTransport.push(pending, { deviceId: currentDeviceId, automatic });
          await acknowledge(result?.accepted || []);
          await rememberConflicts(result?.conflicts || []);
        }

        publish({ phase: 'pulling' });
        const cursor = await getMeta('serverCursor');
        const pulled = await syncTransport.pull(cursor, { deviceId: currentDeviceId, categories: chosen });
        await applyPulledRecords(pulled?.records || []);
        if (pulled?.cursor !== undefined) await setMeta('serverCursor', pulled.cursor);

        const lastSyncAt = new Date().toISOString();
        await setMeta('lastSyncAt', lastSyncAt);
        await refreshCounts();
        publish({ syncing: false, phase: 'synced', lastSyncAt, cloudAvailable: true });
        return { ...captured, cloud: true, offline: false };
      } catch (error) {
        console.warn('StructOS sync failed:', error);
        publish({ syncing: false, phase: navigator.onLine ? 'error' : 'offline', error: error?.message || String(error) });
        return { cloud: false, offline: !navigator.onLine, error };
      } finally {
        activeSyncPromise = null;
      }
    })();
    return activeSyncPromise;
  }

  async function initialize() {
    if (initialized) return { ...state };
    initialized = true;
    try {
      await database();
      const [lastLocalSaveAt, lastSyncAt, ready, persistent] = await Promise.all([
        getMeta('lastLocalSaveAt'),
        getMeta('lastSyncAt'),
        getMeta('deviceReady', false),
        navigator.storage?.persisted?.().catch(() => false) || false
      ]);
      publish({ lastLocalSaveAt, lastSyncAt, deviceReady: ready, persistent, phase: navigator.onLine ? 'checking' : 'offline' });
      await capture(availableCategories, { enqueue: true, reason: 'initialization' });
      await refreshCounts();
      if (navigator.onLine) await runSync(availableCategories, { automatic: true });
    } catch (error) {
      console.warn('StructOS offline storage failed:', error);
      publish({ phase: 'error', error: error?.message || String(error) });
    }

    watchTimer = globalThis.setInterval(async () => {
      if (document.visibilityState === 'hidden' || state.syncing) return;
      const result = await capture(availableCategories, { enqueue: true, reason: 'watch' }).catch(() => null);
      if (navigator.onLine && result?.saved?.length && await transportAvailable()) {
        runSync(result.saved, { automatic: true });
      }
    }, Math.max(5000, Number(watchInterval) || DEFAULT_WATCH_INTERVAL));

    return { ...state };
  }

  function handleOnline() {
    publish({ online: true, phase: 'checking' });
    runSync(availableCategories, { automatic: true });
  }

  function handleOffline() {
    publish({ online: false, syncing: false, phase: 'offline', cloudAvailable: false });
  }

  globalThis.addEventListener('online', handleOnline);
  globalThis.addEventListener('offline', handleOffline);

  return {
    categories: [...availableCategories],
    initialize,
    capture,
    sync: runSync,
    async prepare(selection) {
      await requestPersistentStorage().catch(() => false);
      return runSync(selection, { automatic: false });
    },
    getState: () => ({ ...state }),
    setTransport(nextTransport) {
      syncTransport = nextTransport || null;
      publish({ cloudAvailable: false, phase: navigator.onLine ? 'checking' : 'offline' });
    },
    subscribe(listener) {
      const handler = (event) => listener(event.detail);
      events.addEventListener('statechange', handler);
      listener({ ...state });
      return () => events.removeEventListener('statechange', handler);
    },
    destroy() {
      if (watchTimer) clearInterval(watchTimer);
      globalThis.removeEventListener('online', handleOnline);
      globalThis.removeEventListener('offline', handleOffline);
    }
  };
}
