create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  expiration_time bigint,
  device_name text not null default 'Web',
  language text not null default 'RU',
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_used_at timestamptz,
  constraint push_subscriptions_endpoint_https check (
    char_length(endpoint) between 20 and 4096
    and endpoint like 'https://%'
  ),
  constraint push_subscriptions_p256dh_length check (char_length(p256dh) between 20 and 512),
  constraint push_subscriptions_auth_length check (char_length(auth) between 8 and 512),
  constraint push_subscriptions_device_name_length check (char_length(device_name) between 1 and 80),
  constraint push_subscriptions_language_supported check (language in ('RU', 'EN', 'KY', 'TJ')),
  constraint push_subscriptions_endpoint_key unique (endpoint)
);

create index push_subscriptions_user_id_idx
  on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

revoke all on table public.push_subscriptions from public, anon, authenticated;
grant select, insert, update, delete on table public.push_subscriptions to service_role;

comment on table public.push_subscriptions is
  'Server-managed Web Push subscriptions for authenticated StructOS users.';

create table public.push_configuration (
  id boolean primary key default true,
  vapid_public_key text not null,
  vapid_private_key text not null,
  vapid_subject text not null,
  updated_at timestamptz not null default now(),
  constraint push_configuration_singleton check (id),
  constraint push_configuration_public_key_length check (char_length(vapid_public_key) between 80 and 120),
  constraint push_configuration_private_key_length check (char_length(vapid_private_key) between 30 and 80),
  constraint push_configuration_subject_format check (
    vapid_subject like 'mailto:%' or vapid_subject like 'https://%'
  )
);

alter table public.push_configuration enable row level security;

revoke all on table public.push_configuration from public, anon, authenticated;
grant select, insert, update on table public.push_configuration to service_role;

comment on table public.push_configuration is
  'Singleton server-only VAPID configuration. The private key is never exposed to browser clients.';
