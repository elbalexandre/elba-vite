import path from 'node:path'
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
import devServer from '@hono/vite-dev-server'
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const configPath = path.resolve('./config.ts')

// inject config import for vercel function build
const formatEndpointSource = (filePath) => {
  const configImportPath = path.relative(
    path.join(rootDir, path.dirname(filePath)),
    configPath,
  ).replace('.ts', '')
  const importConfigStatement = `import { config } from '${configImportPath}';\n`
  const fileContent = readFileSync(path.join(rootDir, 'routes/webhooks/users/delete-users/index.ts')).toString()

  return {
    contents: importConfigStatement + fileContent,
    loader: 'tsx',
    resolveDir: path.join(rootDir, path.dirname(filePath)),
    sourcefile: filePath
  }
}

/** @type {(config: import('./config').ElbaConfig) => import('./config').UserConfig} */
export const createElbaViteConfig = (
  config
) => {
  /** @type {import('vite-plugin-vercel').ViteVercelApiEntry[]}  */
  const endpoints = []

  if (config.features.users.revokable) {
    endpoints.push({
      source: formatEndpointSource('routes/webhooks/users/delete-users/index.ts'),
      destination: '/api/webhooks/users/delete-users',
      edge: true
    })
  }

  return defineConfig({
    plugins: [
      vercel(),
      devServer({
        entry: path.join(rootDir, '/dev-server/index.ts'),
        adapter: async () => {
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