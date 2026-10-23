import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import bootstrap from './src/main.server';

const serverRequire = createRequire(import.meta.url);

// Load the single root .env before PORT is read and before API modules connect to services.
const runtimeProjectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
serverRequire('dotenv').config({ path: resolve(runtimeProjectRoot, '.env') });

// The Angular build emits this server file under dist/password-app/server.
// Resolve the backend from the project root, not from the generated dist folder.
function loadApiRouter(serverDistFolder: string) {
  const projectRoot = resolve(serverDistFolder, '../../..');
  const apiRouterPath = resolve(projectRoot, 'SafePassVaullAPI', 'api-router.cjs');
  return serverRequire(apiRouterPath) as express.RequestHandler;
}

// The exported Express app is the single local-development and production entry point for the API and SSR UI.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = resolve(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // API routes must be registered before static assets and the Angular catch-all.
  server.use('/api', loadApiRouter(serverDistFolder));
  server.use('/api', (_req, res) => {
    res.status(404).json({ message: 'API route not found' });
  });

  // Serve browser assets directly. Other GET routes are server-rendered by Angular.
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`SafePassVault full-stack server listening on http://localhost:${port}`);
  });
}

run();
