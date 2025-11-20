/* eslint-env node */
import { getNowPlaying } from './spotify.js';

export const getTrackPayload = async () => {
    try {
        const data = await getNowPlaying();
        return data;
    } catch (error) {
        console.error('Error in getTrackPayload:', error);
        return { isPlaying: false, error: 'Failed to fetch Spotify data' };
    }
};
