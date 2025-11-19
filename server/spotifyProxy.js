/* eslint-env node */

const DESKTOP_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
};

const DEFAULT_TRACK_URL = 'https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIyt';
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
const trackCache = new Map();
const env = typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env
    ? globalThis.process.env
    : {};

const sanitizeTrackUrl = (input) => {
    if (!input) return DEFAULT_TRACK_URL;
    const trimmed = input.trim();
    if (!trimmed) return DEFAULT_TRACK_URL;

    if (trimmed.startsWith('http')) {
        return trimmed;
    }

    if (trimmed.startsWith('spotify:track:')) {
        const [, , trackId] = trimmed.split(':');
        return `https://open.spotify.com/track/${trackId}`;
    }

    return `https://open.spotify.com/track/${trimmed}`;
};

const extractEmbedUrl = (oEmbedPayload) => {
    if (oEmbedPayload.iframe_url) return oEmbedPayload.iframe_url;
    if (oEmbedPayload.html) {
        const match = oEmbedPayload.html.match(/src="([^"]+)"/i);
        if (match) return match[1];
    }
    return null;
};

const parsePreviewFromHtml = (html) => {
    if (!html) return null;
    const match = html.match(/property="og:audio" content="([^"]+)"/i);
    return match ? match[1] : null;
};

export const getTrackPayload = async (maybeTrackUrl) => {
    const fallbackUrl = env.SPOTIFY_TRACK_URL || env.VITE_SPOTIFY_TRACK_URL;
    const resolvedUrl = sanitizeTrackUrl(maybeTrackUrl || fallbackUrl);

    const cached = trackCache.get(resolvedUrl);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    const metaResponse = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(resolvedUrl)}&format=json`);
    if (!metaResponse.ok) {
        throw new Error('Unable to reach Spotify. Double check the track URL.');
    }

    const meta = await metaResponse.json();

    let previewUrl = null;
    try {
        const trackResponse = await fetch(resolvedUrl, { headers: DESKTOP_HEADERS });
        if (trackResponse.ok) {
            const html = await trackResponse.text();
            previewUrl = parsePreviewFromHtml(html);
        }
    } catch (error) {
        console.error('spotify preview fetch failed', error);
    }

    const payload = {
        name: meta?.title ?? 'Unknown Track',
        artist: meta?.author_name ?? 'Spotify',
        image: meta?.thumbnail_url,
        embedUrl: extractEmbedUrl(meta),
        trackUrl: resolvedUrl,
        previewUrl
    };

    trackCache.set(resolvedUrl, {
        timestamp: Date.now(),
        data: payload
    });

    return payload;
};

export const __internal = {
    sanitizeTrackUrl,
    parsePreviewFromHtml
};
