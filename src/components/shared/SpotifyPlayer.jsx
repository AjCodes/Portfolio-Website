import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useSpotify } from '../../context/SpotifyContext';

const fallbackTrack = {
  name: 'Recently played',
  artist: 'Spotify',
  album: 'AJCODEX',
  image: '',
  previewUrl: null,
  trackUrl: 'https://open.spotify.com/'
};

const SpotifyLogo = ({ className = 'h-5 w-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const SpotifyPlayer = ({ inline = false }) => {
  const { isPlaying, togglePlay, currentTrack, isLoading, progress, error, hasInlineAudio } = useSpotify();
  const [isExpanded, setIsExpanded] = useState(false);
  const track = currentTrack?.name ? currentTrack : fallbackTrack;
  const albumArt = track.image || '';
  const status = isPlaying ? 'Now playing' : 'Recently played';

  return (
    <motion.div
      className={inline ? 'w-full' : 'fixed bottom-4 left-4 z-50 max-sm:bottom-3 max-sm:left-3'}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className={`${inline ? 'w-full' : 'w-[min(21rem,calc(100vw-1.5rem))]'} rounded-2xl border border-[#e8d8c9]/12 bg-[#181818]/92 p-4 text-[#e8d8c9] shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl`}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#e8d8c9]/12 bg-[#4b607f]/22">
                {albumArt ? (
                  <img src={albumArt} alt={track.album} className="h-full w-full object-cover" />
                ) : (
                  <SpotifyLogo className="h-6 w-6 text-[#1DB954]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8d8c9]/48">
                  {isLoading ? 'Loading Spotify' : status}
                </p>
                <h3 className="mt-1 truncate text-sm font-bold text-[#e8d8c9]">{track.name}</h3>
                <p className="truncate text-xs text-[#e8d8c9]/58">{track.artist}</p>
              </div>

              <button
                type="button"
                onClick={togglePlay}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1DB954] text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-45"
                disabled={isLoading || Boolean(error)}
                aria-label={isPlaying ? 'Pause Spotify preview' : 'Play Spotify preview'}
              >
                {isPlaying ? (
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="h-4 w-1.5 rounded-full bg-current" />
                    <span className="h-4 w-1.5 rounded-full bg-current" />
                  </span>
                ) : (
                  <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#e8d8c9]/10">
              <motion.div
                className="h-full rounded-full bg-[#1DB954]"
                animate={{ width: `${Math.round((progress || 0) * 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#e8d8c9]/50">
              <span>{hasInlineAudio ? '30s preview available' : 'Opens in Spotify'}</span>
              <a
                href={track.trackUrl || fallbackTrack.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#e8d8c9]/70 transition-colors hover:text-[#1DB954]"
              >
                Open
              </a>
            </div>

            {error && (
              <p className="mt-3 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-xs text-[#e8d8c9]/68">
                Spotify is unavailable right now. The widget stays here so the layout remains consistent.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => setIsExpanded(true)}
            className={`group flex ${inline ? 'w-full' : 'w-[15.5rem] max-w-[calc(100vw-1.5rem)] max-sm:w-[12.75rem]'} items-center gap-3 rounded-2xl border border-[#e8d8c9]/12 bg-[#181818]/86 px-3 py-2 text-left text-[#e8d8c9] shadow-[0_18px_54px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-colors hover:border-[#1DB954]/35`}
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Open Spotify player"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#e8d8c9]/12 bg-[#4b607f]/22">
              {albumArt ? (
                <img src={albumArt} alt={track.album} className="h-full w-full object-cover" />
              ) : (
                <SpotifyLogo className="h-5 w-5 text-[#1DB954]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#e8d8c9]/45 max-sm:hidden">
                {isLoading ? 'Loading Spotify' : status}
              </p>
              <p className="truncate text-sm font-bold leading-tight">{track.name}</p>
              <p className="truncate text-xs text-[#e8d8c9]/54">{track.artist}</p>
            </div>
            <SpotifyLogo className="h-5 w-5 shrink-0 text-[#1DB954]" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpotifyPlayer;
