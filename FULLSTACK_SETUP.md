# SafePassVault: single-server Angular 18 SSR + Node.js API

The web UI and Node.js API run in one Node process and share one port. The root `server.ts` is the only HTTP server entry point. It mounts `SafePassVaullAPI/api-router.cjs` at `/api`; that router loads the existing JavaScript routes, controllers, models, and config modules. Angular page requests are rendered by Angular SSR. API requests are handled before the Angular catch-all.

All frontend and backend dependencies are declared in the root Angular `package.json`. Run `npm install` once to resolve this consolidated dependency tree and generate the one root `package-lock.json`. There is no standalone backend package, backend listener, or Python implementation.

## Local integrated server

1. Install Node.js 20 or newer.
2. Run `npm install` from the repository root. This resolves the consolidated frontend/backend dependency tree and refreshes the root lockfile.
3. Copy `.env.example` to `.env` and set `MONGOURL`, a strong `SECRET_KEY`, and any credentials needed by the integrations you use.
4. Start the exact SSR server used in production with `npm run dev`. This builds Angular in development mode and then runs the compiled `server.ts` Express app on port 4000 by default. API: `http://localhost:4000/api/health`.

`ng serve` does not run this custom `server.ts` on Angular 18, so use `npm run dev` when testing the integrated full-stack server. This flow is not hot-reload; rebuild/restart after code changes.

## Production

- Build: `npm install && npm run build:fullstack`
- Start: `npm start`
- Configure `PORT` if the host assigns a port (default 4000).
- Set secrets and integration variables in the hosting environment; do not commit `.env`.
- Health check: `GET /api/health`.

The root `Dockerfile` installs dependencies once and starts one Node process. Keep `SafePassVaullAPI` as source code only; do not add a second `package.json`, lockfile, or `app.listen()` there.
