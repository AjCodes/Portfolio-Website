import { useState, useEffect, createContext, useContext, useRef } from 'react';

const SpotifyContext = createContext();

const API_ENDPOINT = '/api/spotify/track';

export const SpotifyProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [hasInlineAudio, setHasInlineAudio] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.preload = 'auto';
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const fetchSpotifyData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(API_ENDPOINT, {
                headers: { 'Cache-Control': 'no-cache' }
            });
            if (!response.ok) {
                throw new Error('Unable to reach the Spotify proxy endpoint.');
            }
            const payload = await response.json();

            // Handle error responses
            if (payload.error) {
                throw new Error(payload.error);
            }

            setCurrentTrack(payload);
            setProgress(0);
            setIsPlaying(false);
            setHasInlineAudio(Boolean(payload.previewUrl));

            if (payload.previewUrl && audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = payload.previewUrl;
                audioRef.current.currentTime = 0;
            }
        } catch (err) {
            setError(err.message || 'Unable to load Spotify data right now.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSpotifyData();
        const interval = setInterval(fetchSpotifyData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            if (!audio.duration || Number.isNaN(audio.duration)) {
                setProgress(0);
                return;
            }
            setProgress(audio.currentTime / audio.duration);
        };

        const handleEnded = () => setIsPlaying(false);
        const handleError = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('loadedmetadata', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('loadedmetadata', updateProgress);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying && currentTrack?.previewUrl) {
            audio.play().catch(() => {
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, currentTrack?.previewUrl]);

    const togglePlay = () => {
        if (!currentTrack) return;

        if (!currentTrack.previewUrl) {
            if (currentTrack.trackUrl) {
                window.open(currentTrack.trackUrl, '_blank', 'noopener,noreferrer');
            }
            return;
        }

        setIsPlaying(prev => !prev);
    };

    return (
        <SpotifyContext.Provider value={{
            isPlaying,
            currentTrack,
            isLoading,
            togglePlay,
            progress,
            error,
            hasInlineAudio
        }}>
            {children}
        </SpotifyContext.Provider>
    );
};

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
};
