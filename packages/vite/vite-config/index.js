import path from 'node:path'
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
import devServer from '@hono/vite-dev-server'
import { fileURLToPath } from 'url';

/** @type {(config: import('./config').ElbaConfig) => import('./config').UserConfig} */
export const createElbaViteConfig = (
  config
) => {
  /** @type {import('vite-plugin-vercel').ViteVercelApiEntry[]}  */
  const endpoints = []
  const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')

  if (config.features.users.revokable) {
    endpoints.push({
      source: path.join(rootDir, 'routes/webhooks/users/delete-users/index.ts'),
      destination: '/api/webhooks/users/delete-users',
      edge: true
    })
  }

  return defineConfig({
    plugins: [
      vercel(),
      devServer({
        entry: path.join(rootDir, '/dev-server/index.ts'),
        adapter: () => {
          globalThis.config = config
          return {}
        },
      })
    ],
    vercel: {
      additionalEndpoints: endpoints
    },
  })
}