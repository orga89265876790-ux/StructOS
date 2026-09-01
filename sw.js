const CACHE_NAME = 'structos-offline-v86';
const CORE_PAGES = ['./', './dashboard.html', './passport.html', './login.html', './manifest.webmanifest'];
const OPTIONAL_SOURCE_ASSETS = [
  './dashboard.js',
  './dashboard.css',
  './offline-sync.js',
  './auth-config.js',
  './professions.js',
  './metro-directory.js',
  './assets/structos-building-mark.svg',
  './assets/favicon-192.png',
  './assets/favicon-512.png'
];

function sameOriginAsset(url) {
  const parsed = new URL(url, self.location.href);
  return parsed.origin === self.location.origin
    && !parsed.pathname.match(/\.(?:mp4|webm|mov)$/i);
}

async function discoverPageAssets(response) {
  const html = await response.clone().text();
  const urls = [];
  const attributes = html.matchAll(/(?:src|href)=["']([^"'#]+)["']/gi);
  for (const match of attributes) {
    const absolute = new URL(match[1], response.url).href;
    if (sameOriginAsset(absolute)) urls.push(absolute);
  }
  return [...new Set(urls)];
}

async function cacheOfflineShell() {
  const cache = await caches.open(CACHE_NAME);
  const pageResults = await Promise.allSettled(CORE_PAGES.map(async (url) => {
    const response = await fetch(url, { cache: 'reload' });
    if (!response.ok) throw new Error(`Could not cache ${url}`);
    await cache.put(url, response.clone());
    if (response.headers.get('content-type')?.includes('text/html')) {
      const assets = await discoverPageAssets(response);
      await Promise.allSettled(assets.map((asset) => cache.add(asset)));
    }
  }));
  await Promise.allSettled(OPTIONAL_SOURCE_ASSETS.map((url) => cache.add(url)));
  if (!pageResults.some((result) => result.status === 'fulfilled')) throw new Error('StructOS shell is unavailable');
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheOfflineShell());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('structos-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function navigationResponse(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request, { ignoreSearch: true }))
      || (await cache.match('./dashboard.html'))
      || (await cache.match('./'))
      || Response.error();
  }
}

async function staticResponse(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  const refresh = fetch(request).then(async (response) => {
    if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
    return response;
  });
  if (cached) {
    refresh.catch(() => {});
    return cached;
  }
  try {
    return await refresh;
  } catch {
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.headers.has('range') || request.destination === 'video') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }
  if (['script', 'style', 'image', 'font', 'manifest'].includes(request.destination)) {
    event.respondWith(staticResponse(request));
  }
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
