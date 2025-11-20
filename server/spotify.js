/* eslint-env node */
import querystring from 'querystring';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async () => {
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

    return response.json();
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (response.status === 204 || response.status > 400) {
        // If nothing is playing, check recently played
        const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!recentResponse.ok) return { isPlaying: false };

        const recentData = await recentResponse.json();
        if (!recentData.items || recentData.items.length === 0) return { isPlaying: false };

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
};
