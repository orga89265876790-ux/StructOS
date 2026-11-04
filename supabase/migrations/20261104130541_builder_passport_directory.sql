-- Minimal opt-in directory. Private passport fields never enter this table.
create table public.builder_passport_directory (
 user_id uuid primary key references auth.users(id) on delete cascade,
 passport_number text not null unique check (passport_number ~ '^[0-9]{7}$'),
 full_name text not null default '' check (length(full_name)<=240),
 profession text not null default '' check (length(profession)<=140),
 published boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.builder_passport_directory enable row level security;
revoke all on public.builder_passport_directory from anon, authenticated;
grant select,insert,update,delete on public.builder_passport_directory to authenticated;
create policy "Read own or published passports" on public.builder_passport_directory for select to authenticated using ((select auth.uid())=user_id or published);
create policy "Create own passport" on public.builder_passport_directory for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Update own passport" on public.builder_passport_directory for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "Delete own passport" on public.builder_passport_directory for delete to authenticated using ((select auth.uid())=user_id);
