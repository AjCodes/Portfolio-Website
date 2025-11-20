/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { getTrackPayload } from './server/spotifyProxy.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const spotifyProxyPlugin = () => ({
  name: 'spotify-proxy-middleware',
  configureServer(server) {
    server.middlewares.use('/api/spotify/track', async (req, res) => {
      if (req.method && req.method !== 'GET') {
        res.statusCode = 405
        res.setHeader('Allow', 'GET')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }
      try {
        const data = await getTrackPayload();
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error('[vite spotify proxy]', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error.message || 'Spotify proxy failed' }));
      }
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spotifyProxyPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
