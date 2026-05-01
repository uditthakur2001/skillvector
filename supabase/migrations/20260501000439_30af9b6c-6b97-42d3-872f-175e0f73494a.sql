
drop policy if exists "mentor_apps_insert_anyone" on public.mentor_applications;
create policy "mentor_apps_insert_auth" on public.mentor_applications
  for insert to authenticated
  with check (auth.uid() = user_id);

revoke execute on function public.handle_new_user() from public, anon, authenticated;
