-- Create extension for UUID generation (safe if already enabled)
create extension if not exists pgcrypto;

-- Contact messages table for portfolio form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) between 10 and 3000),
  source text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Helpful index for recent-first admin queries
create index if not exists idx_contact_messages_created_at_desc
  on public.contact_messages (created_at desc);

-- Enable RLS (service role used in Netlify Function bypasses this)
alter table public.contact_messages enable row level security;

-- Block direct anonymous reads/writes from client-side access
drop policy if exists "no_anon_access_contact_messages" on public.contact_messages;
create policy "no_anon_access_contact_messages"
  on public.contact_messages
  for all
  to anon
  using (false)
  with check (false);

