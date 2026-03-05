# Portfolio Backend

## Setup

1. Copy `.env.example` to `.env`.
2. Install deps: `npm install`
3. Start dev server: `npm run dev`

Server default: `http://localhost:5000`

## API Endpoints

- `GET /api/health`
- `GET /api/projects`
- `GET /api/certificates`
- `GET /api/contact`
- `POST /api/contact`

### POST /api/contact payload

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message here"
}
```
