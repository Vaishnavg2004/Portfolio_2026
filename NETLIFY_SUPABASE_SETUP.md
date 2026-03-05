# Netlify + Supabase Setup

## 1) Supabase table
Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text,
  user_agent text,
  created_at timestamptz not null default now()
);
```

## 2) Netlify environment variables
In Netlify Site Settings > Environment Variables, set:

- `VITE_API_URL=/.netlify/functions`
- `SUPABASE_URL=your_supabase_project_url`
- `SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key`
- `RESEND_API_KEY=your_resend_api_key`
- `CONTACT_TO_EMAIL=vaishnavg2004@gmail.com`
- `CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>`

Notes:
- `SUPABASE_SERVICE_ROLE_KEY` must be kept secret. Do not expose it in frontend code.
- Replace `CONTACT_FROM_EMAIL` with your verified domain sender when ready.

## 3) Deploy to Netlify
1. Push this repo to GitHub.
2. In Netlify: Add new site from Git.
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Deploy.

## 4) Test after deploy
- Open your site and submit contact form.
- Verify row added in Supabase `contact_messages`.
- Verify email arrives at `CONTACT_TO_EMAIL`.
