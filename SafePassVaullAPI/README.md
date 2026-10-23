# SafePassVault Node.js API source

This directory contains the Node.js API routes, controllers, models, middleware, and integration configuration. It is **not a separate server/package**. The root Angular SSR `server.ts` loads `api-router.cjs` and mounts it at `/api`, sharing the SSR listener and port for both local integrated development and production.

Install dependencies only from the repository root (`npm install`). Configure root `.env` using `.env.example`. Start the integrated application using `npm run dev` locally or `npm start` after a production build. Do not add a separate package manifest or call `app.listen()` from this directory.
