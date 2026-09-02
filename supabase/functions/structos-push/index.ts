import { createClient } from 'npm:@supabase/supabase-js@2.112.3';
import webpush from 'npm:web-push@3.6.7';

type PushSubscriptionInput = {
  endpoint?: unknown;
  expirationTime?: unknown;
  keys?: { p256dh?: unknown; auth?: unknown };
};

type NotificationPayload = {
  title: string;
  body: string;
  url: string;
  tag: string;
  type: string;
  createdAt: string;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const legacyServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const secretKeys = (() => {
  try { return JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}') as Record<string, string>; }
  catch { return {}; }
})();
const serviceKey = secretKeys.default || legacyServiceKey;
const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

function bearerToken(req: Request) {
  const header = req.headers.get('Authorization') || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

function isServiceRequest(req: Request) {
  const apiKey = req.headers.get('apikey') || '';
  const bearer = bearerToken(req);
  return Boolean(serviceKey) && (
    apiKey === serviceKey
    || (Boolean(legacyServiceKey) && bearer === legacyServiceKey)
  );
}

async function authenticatedUser(req: Request) {
  const token = bearerToken(req);
  if (!token) return null;
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

function cleanText(value: unknown, max: number) {
  return String(value || '').trim().slice(0, max);
}

function validEndpoint(value: unknown) {
  const endpoint = cleanText(value, 4096);
  try { return new URL(endpoint).protocol === 'https:' ? endpoint : ''; }
  catch { return ''; }
}

function validKey(value: unknown, max = 512) {
  const key = cleanText(value, max);
  return /^[A-Za-z0-9_-]+$/.test(key) ? key : '';
}

function normalizeSubscription(input: PushSubscriptionInput) {
  const endpoint = validEndpoint(input?.endpoint);
  const p256dh = validKey(input?.keys?.p256dh);
  const auth = validKey(input?.keys?.auth);
  if (!endpoint || !p256dh || !auth) return null;
  return { endpoint, p256dh, auth, expirationTime: typeof input.expirationTime === 'number' ? input.expirationTime : null };
}

async function pushConfiguration() {
  const { data, error } = await admin.from('push_configuration').select('vapid_public_key,vapid_private_key,vapid_subject').eq('id', true).single();
  if (error || !data?.vapid_public_key || !data?.vapid_private_key) throw new Error('Push configuration is unavailable');
  webpush.setVapidDetails(data.vapid_subject || 'mailto:notifications@structos.ru', data.vapid_public_key, data.vapid_private_key);
  return data;
}

function localizedTest(language: string): NotificationPayload {
  const messages: Record<string, { title: string; body: string }> = {
    EN: { title: 'StructOS is connected', body: 'Notifications work. Important project events will appear here.' },
    KY: { title: 'StructOS байланышта', body: 'Билдирүүлөр иштейт. Маанилүү объект окуялары ушул жерде чыгат.' },
    TJ: { title: 'StructOS дар алоқа', body: 'Огоҳиҳо кор мекунанд. Рӯйдодҳои муҳими объектҳо дар ин ҷо пайдо мешаванд.' },
    RU: { title: 'StructOS на связи', body: 'Уведомления работают. Важные события по объектам появятся здесь.' },
  };
  const message = messages[language] || messages.RU;
  return { ...message, url: './dashboard.html#notifications', tag: 'structos-test', type: 'test', createdAt: new Date().toISOString() };
}

function normalizePayload(input: Record<string, unknown>): NotificationPayload {
  return {
    title: cleanText(input.title, 90) || 'StructOS',
    body: cleanText(input.body, 240) || 'У вас новое уведомление',
    url: cleanText(input.url, 500) || './dashboard.html#notifications',
    tag: cleanText(input.tag, 120) || 'structos-notification',
    type: cleanText(input.type, 40) || 'notice',
    createdAt: new Date().toISOString(),
  };
}

async function sendToUsers(userIds: string[], payload: NotificationPayload) {
  await pushConfiguration();
  const { data, error } = await admin.from('push_subscriptions').select('id,user_id,endpoint,p256dh,auth').in('user_id', userIds.slice(0, 100));
  if (error) throw error;
  let sent = 0;
  let failed = 0;
  const staleIds: string[] = [];
  const deliveredIds: string[] = [];
  await Promise.all((data || []).map(async (subscription) => {
    try {
      await webpush.sendNotification({ endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } }, JSON.stringify(payload), { TTL: 300, urgency: 'high' });
      sent += 1;
      deliveredIds.push(subscription.id);
    } catch (error) {
      failed += 1;
      const statusCode = Number((error as { statusCode?: number })?.statusCode || 0);
      if (statusCode === 404 || statusCode === 410) staleIds.push(subscription.id);
      console.error('StructOS push delivery failed', { statusCode, subscriptionId: subscription.id });
    }
  }));
  if (deliveredIds.length) {
    await admin.from('push_subscriptions').update({ last_used_at: new Date().toISOString() }).in('id', deliveredIds);
  }
  if (staleIds.length) await admin.from('push_subscriptions').delete().in('id', staleIds);
  return { sent, failed, removed: staleIds.length };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);
  if (!supabaseUrl || !serviceKey) return json({ ok: false, error: 'Server configuration is unavailable' }, 503);

  try {
    const raw = await req.text();
    if (raw.length > 32_000) return json({ ok: false, error: 'Request is too large' }, 413);
    const body = raw ? JSON.parse(raw) as Record<string, unknown> : {};
    const action = cleanText(body.action, 40);
    const serviceRequest = isServiceRequest(req);
    const user = serviceRequest ? null : await authenticatedUser(req);
    if (!serviceRequest && !user) return json({ ok: false, error: 'Unauthorized' }, 401);

    if (action === 'public-key') {
      const config = await pushConfiguration();
      return json({ ok: true, publicKey: config.vapid_public_key });
    }

    if (action === 'subscribe' && user) {
      const subscription = normalizeSubscription((body.subscription || {}) as PushSubscriptionInput);
      if (!subscription) return json({ ok: false, error: 'Invalid subscription' }, 400);
      const now = new Date().toISOString();
      const { error } = await admin.from('push_subscriptions').upsert({ user_id: user.id, endpoint: subscription.endpoint, p256dh: subscription.p256dh, auth: subscription.auth, expiration_time: subscription.expirationTime, device_name: cleanText(body.deviceName, 80) || 'Web', language: cleanText(body.language, 5) || 'RU', user_agent: cleanText(req.headers.get('user-agent'), 500), updated_at: now, last_used_at: now }, { onConflict: 'endpoint' });
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === 'unsubscribe' && user) {
      const endpoint = validEndpoint(body.endpoint);
      if (!endpoint) return json({ ok: false, error: 'Invalid endpoint' }, 400);
      const { error } = await admin.from('push_subscriptions').delete().eq('user_id', user.id).eq('endpoint', endpoint);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === 'send-test' && user) {
      const delivery = await sendToUsers([user.id], localizedTest(cleanText(body.language, 5)));
      return json({ ok: delivery.sent > 0, ...delivery, error: delivery.sent ? undefined : 'No active device subscription' }, delivery.sent ? 200 : 409);
    }

    if (action === 'send' && serviceRequest) {
      const userIds = Array.isArray(body.userIds) ? [...new Set(body.userIds.map((value) => cleanText(value, 36)).filter((value) => /^[0-9a-f-]{36}$/i.test(value)))].slice(0, 100) : [];
      if (!userIds.length) return json({ ok: false, error: 'No recipients' }, 400);
      const delivery = await sendToUsers(userIds, normalizePayload((body.notification || {}) as Record<string, unknown>));
      return json({ ok: true, ...delivery });
    }

    return json({ ok: false, error: 'Unknown action' }, 400);
  } catch (error) {
    console.error('StructOS push function failed', error);
    return json({ ok: false, error: 'Push request failed' }, 500);
  }
});
