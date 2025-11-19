/* eslint-env node */
import { getTrackPayload } from '../../server/spotifyProxy.js';

const respond = (res, statusCode, body) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(body));
};

export default async function handler(req, res) {
    if (req.method && req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return respond(res, 405, { error: 'Method not allowed' });
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const trackUrl = url.searchParams.get('trackUrl');

    try {
        const data = await getTrackPayload(trackUrl);
        res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
        return respond(res, 200, data);
    } catch (error) {
        console.error('[api/spotify/track] failed', error);
        return respond(res, 500, { error: error.message || 'Unexpected Spotify proxy error' });
    }
}
