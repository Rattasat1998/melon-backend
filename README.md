# Melon Backend

Backend API for tracking melon cultivation. The first version is intentionally small enough to run on one Droplet with Docker Compose.

## Stack

- NestJS + TypeScript for the API
- PostgreSQL for relational crop tracking data
- Prisma for schema, migrations, and typed database access
- Docker Compose for Droplet deployment

## Local Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

When running the API directly on your host while Postgres is in Docker, change `DATABASE_URL` to use `localhost` instead of `db`.

```env
DATABASE_URL=postgresql://melon:change_me@localhost:5432/melon_backend?schema=public
```

## Droplet Setup

Install Docker and Docker Compose on the Droplet, then deploy from this project folder:

```bash
cp .env.example .env
docker compose up -d --build
```

The API listens on port `3000` by default. Scalar API reference is available at:

```text
http://YOUR_DROPLET_IP:3000/reference
```

Swagger documentation is still available at:

```text
http://YOUR_DROPLET_IP:3000/docs
```

The OpenAPI JSON document is available at:

```text
http://YOUR_DROPLET_IP:3000/openapi.json
```

Recommended next step on the Droplet is to put Nginx in front of the API and issue TLS with Certbot when a domain is ready.

## Current API

- `GET /health`
- `GET /reference`
- `GET /openapi.json`
- `GET /farms`
- `POST /farms`
- `GET /farms/:id`
- `GET /crop-cycles`
- `POST /crop-cycles`
- `GET /crop-cycles/:id`
- `GET /growth-logs?cropCycleId=...`
- `POST /growth-logs`
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id/complete`
