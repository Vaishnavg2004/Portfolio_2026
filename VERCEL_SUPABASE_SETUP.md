# Vercel + Supabase Contact Setup

## Required Vercel Environment Variables
Set these in Vercel Project Settings -> Environment Variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (example: `vaishnavg2004@gmail.com`)
- `CONTACT_FROM_EMAIL` (must be a verified sender in Resend)

## Database Table (Supabase)
Run this SQL once:

```sql
create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) between 10 and 3000),
  source text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_messages_created_at_desc
  on public.contact_messages (created_at desc);
```

## Endpoints Used by Frontend on Vercel
- `GET /api/projects`
- `GET /api/certificates`
- `POST /api/contact`

## Local Dev
- Frontend expects backend at `http://localhost:5000/api` by default in dev.
- Override with `VITE_API_URL` in `frontend/.env` if needed.
