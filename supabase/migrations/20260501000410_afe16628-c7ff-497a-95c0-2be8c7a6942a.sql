
-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Enrollments
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  plan text not null default 'recorded' check (plan in ('recorded','live')),
  amount_paid integer not null default 0,
  progress integer not null default 0,
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);
alter table public.enrollments enable row level security;

create policy "enrollments_select_own" on public.enrollments for select using (auth.uid() = user_id);
create policy "enrollments_insert_own" on public.enrollments for insert with check (auth.uid() = user_id);
create policy "enrollments_update_own" on public.enrollments for update using (auth.uid() = user_id);

-- Mentor applications
create table public.mentor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  expertise text not null,
  experience text,
  message text,
  created_at timestamptz not null default now()
);
alter table public.mentor_applications enable row level security;
create policy "mentor_apps_insert_anyone" on public.mentor_applications for insert with check (true);
create policy "mentor_apps_select_own" on public.mentor_applications for select using (auth.uid() = user_id);

-- Mentor bookings
create table public.mentor_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mentor_name text not null,
  slot_at timestamptz not null,
  topic text,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);
alter table public.mentor_bookings enable row level security;
create policy "bookings_select_own" on public.mentor_bookings for select using (auth.uid() = user_id);
create policy "bookings_insert_own" on public.mentor_bookings for insert with check (auth.uid() = user_id);

-- Course reviews
create table public.course_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);
alter table public.course_reviews enable row level security;
create policy "reviews_select_all" on public.course_reviews for select using (true);
create policy "reviews_insert_own" on public.course_reviews for insert with check (auth.uid() = user_id);
create policy "reviews_update_own" on public.course_reviews for update using (auth.uid() = user_id);
create policy "reviews_delete_own" on public.course_reviews for delete using (auth.uid() = user_id);
