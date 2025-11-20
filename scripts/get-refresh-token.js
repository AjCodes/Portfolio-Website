/* eslint-env node */
import http from 'http';
import { exec } from 'child_process';
import querystring from 'querystring';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env manually since we're running with plain Node
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

// CONFIGURATION
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:5173/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('❌ Error: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in your .env file first.');
    process.exit(1);
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');
        if (code) {
            try {
                const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
                    },
                    body: querystring.stringify({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: REDIRECT_URI
                    })
                });

                const data = await tokenResponse.json();

                if (data.refresh_token) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
                        <h1>Success!</h1>
                        <p>Here is your Refresh Token:</p>
                        <code style="background:#eee;padding:10px;display:block;word-break:break-all;">${data.refresh_token}</code>
                        <p>Copy this and add it to your <strong>.env</strong> file as <code>SPOTIFY_REFRESH_TOKEN</code>.</p>
                    `);
                    console.log('\n✅ Refresh Token acquired!');
                    console.log('SPOTIFY_REFRESH_TOKEN=' + data.refresh_token);
                    console.log('\nAdd this to your .env file.');

                    // Close server after a short delay
                    setTimeout(() => process.exit(0), 1000);
                } else {
                    res.end('Error getting token: ' + JSON.stringify(data));
                }
            } catch (err) {
                res.end('Error: ' + err.message);
            }
        }
    } else {
        // Start auth flow
        const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPES,
            redirect_uri: REDIRECT_URI
        });

        res.writeHead(302, { Location: authUrl });
        res.end();
    }
});

server.listen(5173, () => {
    console.log('Temporary auth server running on http://localhost:5173');
    console.log('Opening browser to authenticate...');
    exec(`start http://localhost:5173`);
});
