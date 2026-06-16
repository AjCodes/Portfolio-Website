/* eslint-env node */
import dotenv from 'dotenv';
import querystring from 'querystring';

// Load environment variables from .env file
dotenv.config();

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const client_id = process.env.SPOTIFY_CLIENT_ID || process.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || process.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || process.env.VITE_SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async () => {
    if (!client_id || !client_secret || !refresh_token) {
        throw new Error('Spotify credentials are not configured.');
    }

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

    if (data.error) {
        throw new Error(data.error_description || data.error);
    }

    return data;
};

export const getNowPlaying = async () => {
    try {
        const { access_token } = await getAccessToken();

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        // If not currently playing (204), try recently played
        // If an error occurs (>= 400), throw so it surfaces properly
        if (response.status >= 400) {
            const errorBody = await response.text();
            throw new Error(`Spotify currently-playing returned ${response.status}: ${errorBody}`);
        }

        if (response.status === 204) {
            const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            if (!recentResponse.ok) {
                const recentError = await recentResponse.text();
                throw new Error(`Spotify recently-played returned ${recentResponse.status}: ${recentError}`);
            }

            const recentData = await recentResponse.json();

            if (!recentData.items || recentData.items.length === 0) {
                return { isPlaying: false };
            }

            const track = recentData.items[0].track;
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

        if (song.item === null) {
            return { isPlaying: false };
        }

        const isPlaying = song.is_playing;
        const name = song.item.name;
        const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
        const album = song.item.album.name;
        const image = song.item.album.images[0].url;
        const url = song.item.external_urls.spotify;
        const previewUrl = song.item.preview_url;

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
        return { isPlaying: false, error: error.message };
    }
};
