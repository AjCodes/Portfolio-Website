/* eslint-env node */
import dotenv from 'dotenv';
import querystring from 'querystring';

// Load environment variables from .env file
dotenv.config();

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async () => {
    console.log('[Spotify] Refreshing access token...');
    console.log('[Spotify] Using client_id:', client_id);
    console.log('[Spotify] Using refresh_token:', refresh_token?.substring(0, 20) + '...');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    const data = await response.json();
    console.log('[Spotify] Token refresh response:', data);

    if (data.error) {
        console.error('[Spotify] Token refresh error:', data.error, data.error_description);
    }

    return data;
};

export const getNowPlaying = async () => {
    try {
        const { access_token } = await getAccessToken();
        console.log('[Spotify] Got access token');

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        console.log('[Spotify] Currently playing status:', response.status);

        if (response.status === 204 || response.status > 400) {
            // If nothing is playing, check recently played
            console.log('[Spotify] Nothing currently playing, checking recently played...');
            const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            console.log('[Spotify] Recently played status:', recentResponse.status);

            if (!recentResponse.ok) {
                console.error('[Spotify] Recently played request failed');
                return { isPlaying: false };
            }

            const recentData = await recentResponse.json();
            console.log('[Spotify] Recently played data:', recentData);

            if (!recentData.items || recentData.items.length === 0) {
                console.log('[Spotify] No recently played items found');
                return { isPlaying: false };
            }

            const track = recentData.items[0].track;
            console.log('[Spotify] Returning recently played track:', track.name);
            return {
                isPlaying: false,
                name: track.name,
                artist: track.artists.map((_artist) => _artist.name).join(', '),
                album: track.album.name,
                image: track.album.images[0].url,
                trackUrl: track.external_urls.spotify,
                previewUrl: track.preview_url
            };
        }

        const song = await response.json();
        console.log('[Spotify] Currently playing song:', song);

        if (song.item === null) {
            console.log('[Spotify] Song item is null');
            return { isPlaying: false };
        }

        const isPlaying = song.is_playing;
        const name = song.item.name;
        const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
        const album = song.item.album.name;
        const image = song.item.album.images[0].url;
        const url = song.item.external_urls.spotify;
        const previewUrl = song.item.preview_url;

        console.log('[Spotify] Returning currently playing track:', name);

        return {
            isPlaying,
            name,
            artist,
            album,
            image,
            trackUrl: url,
            previewUrl
        };
    } catch (error) {
        console.error('[Spotify] Error in getNowPlaying:', error);
        return { isPlaying: false, error: error.message };
    }
};
