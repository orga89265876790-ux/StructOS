create policy push_subscriptions_server_only
  on public.push_subscriptions
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy push_configuration_server_only
  on public.push_configuration
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);
