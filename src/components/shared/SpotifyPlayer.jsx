import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSpotify } from '../../context/SpotifyContext';

const SpotifyPlayer = () => {
  const { isPlaying, togglePlay, currentTrack, isLoading } = useSpotify();
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  // Update progress when playing
  useEffect(() => {
    let interval;
    if (isPlaying && currentTrack && audioRef.current) {
      interval = setInterval(() => {
        if (audioRef.current) {
          const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(isNaN(currentProgress) ? 0 : currentProgress);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Handle audio playback with better error handling
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) return;

    const playAudio = async () => {
      try {
        if (isPlaying && currentTrack.previewUrl) {
          // Only set src if it's different to avoid reloading
          if (audio.src !== currentTrack.previewUrl) {
            audio.src = currentTrack.previewUrl;
            await audio.load();
          }

          // Reset error state
          setAudioError(false);

          // Try to play
          await audio.play();
          console.log('✅ Audio playing successfully');
        } else {
          audio.pause();
        }
      } catch (err) {
        console.error('❌ Audio playback error:', err);
        setAudioError(true);

        // If preview not available or blocked, open Spotify
        if (currentTrack.url && isPlaying) {
          console.log('Opening Spotify link instead');
          window.open(currentTrack.url, '_blank');
          togglePlay(); // Stop the "playing" state since we opened Spotify
        }
      }
    };

    playAudio();

    // Cleanup
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlaying, currentTrack, togglePlay]);

  // Only show when music is playing
  if (isLoading || !currentTrack || !isPlaying) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-primary/30 rounded-2xl p-4 shadow-2xl min-w-[300px]"
            onMouseLeave={() => setIsExpanded(false)}
          >
              {/* Album Art */}
              <div className="flex items-center gap-4 mb-3">
                <motion.div
                  className="w-16 h-16 rounded-lg overflow-hidden shadow-lg flex-shrink-0 relative"
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={currentTrack.image || 'https://via.placeholder.com/300'}
                    alt={currentTrack.album}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                  />
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 border-2 border-[#1DB954] rounded-lg"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-white dark:text-white truncate">
                  {currentTrack.name}
                </h4>
                <p className="text-xs text-gray-300 dark:text-gray-400 truncate">
                  {currentTrack.artist}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                  {currentTrack.album}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#1DB954] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

              {/* Controls */}
            <div className="flex items-center justify-between">
              <motion.button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group/play"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>

              <a
                href={currentTrack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-300 dark:text-gray-400 hover:text-[#1DB954] transition-colors flex items-center gap-1"
              >
                Open in Spotify
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z" />
                </svg>
              </a>
            </div>

            {/* Hidden audio element for actual playback */}
            <audio
              ref={audioRef}
              preload="auto"
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('❌ Audio element error:', e);
                setAudioError(true);
              }}
              onEnded={() => {
                setProgress(0);
                togglePlay();
              }}
              onLoadedData={() => {
                console.log('✅ Audio loaded successfully');
              }}
              onPlay={() => {
                console.log('🎵 Audio started playing');
              }}
            />

            {/* Debug info for audio errors */}
            {audioError && (
              <div className="mt-2 text-[10px] text-red-400 flex items-center gap-1">
                <span>⚠️</span>
                <span>Preview unavailable - Click to open in Spotify</span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-full p-4 shadow-2xl hover:shadow-[#1DB954]/50 transition-all duration-300 flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Album Art Thumbnail */}
            <motion.div
              className="w-12 h-12 rounded-lg overflow-hidden shadow-lg relative"
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
            >
              <img
                src={currentTrack.image || 'https://via.placeholder.com/300'}
                alt={currentTrack.album}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300';
                }}
              />
            </motion.div>

            {/* Track Info */}
            <div className="text-left max-w-[200px] hidden sm:block">
              <p className="font-bold text-sm truncate">{currentTrack.name}</p>
              <p className="text-xs opacity-90 truncate">{currentTrack.artist}</p>
            </div>

            {/* Play/Pause Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {/* Pulse animation when playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full bg-[#1DB954]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpotifyPlayer;

