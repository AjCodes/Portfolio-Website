/* eslint-env node */

const LIKE_KEY = 'portfolio_likes';
const STARTING_LIKES = 145;

const respond = (res, statusCode, body) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
};

const getRedisConfig = () => {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    return { url, token };
};

const redisCommand = async (command) => {
    const { url, token } = getRedisConfig();

    if (!url || !token) {
        throw new Error('Missing Redis REST environment variables');
    }

    const response = await fetch(`${url.replace(/\/$/, '')}/${command}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Redis command failed with ${response.status}`);
    }

    return response.json();
};

const getLikes = async () => {
    const data = await redisCommand(`get/${encodeURIComponent(LIKE_KEY)}`);
    const parsed = Number.parseInt(data.result, 10);
    return Number.isFinite(parsed) ? parsed : STARTING_LIKES;
};

const incrementLikes = async () => {
    await redisCommand(`setnx/${encodeURIComponent(LIKE_KEY)}/${STARTING_LIKES}`);
    const data = await redisCommand(`incr/${encodeURIComponent(LIKE_KEY)}`);
    const parsed = Number.parseInt(data.result, 10);
    return Number.isFinite(parsed) ? parsed : STARTING_LIKES + 1;
};

export default async function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        res.setHeader('Allow', 'GET, POST');
        return respond(res, 405, { error: 'Method not allowed' });
    }

    try {
        const count = req.method === 'POST' ? await incrementLikes() : await getLikes();
        return respond(res, 200, { count, persisted: true });
    } catch (error) {
        console.error('[api/likes] failed', error);
        return respond(res, 503, {
            count: STARTING_LIKES,
            persisted: false,
            error: 'Likes storage is not configured',
        });
    }
}
