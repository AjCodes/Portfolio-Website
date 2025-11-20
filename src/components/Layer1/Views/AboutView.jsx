import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useSpotify } from '../../../context/SpotifyContext';

const locations = [
    {
        id: 'yemen',
        name: 'Yemen',
        x: 61,
        y: 55,
        headline: 'Origins',
        timeline: '0 – 4 yrs',
        description: 'Where my story began.',
        details: 'Desert sunrises and the first sparks of curiosity. Yemen grounded my perspective and taught me resilience early on.',
        coordinates: '15.3°N / 44.2°E'
    },
    {
        id: 'malaysia',
        name: 'Malaysia',
        x: 78,
        y: 58,
        headline: 'Growth Phase',
        timeline: '4 – 27 yrs',
        description: 'Grew up across Kuala Lumpur.',
        details: 'Multicultural energy, design school, and my first production deployments. Malaysia is where passion and craft collided.',
        coordinates: '3.1°N / 101.7°E'
    },
    {
        id: 'netherlands',
        name: 'Netherlands',
        x: 49,
        y: 28,
        headline: 'Current Base',
        timeline: 'Present',
        description: 'Now building the future here.',
        details: 'Europe’s innovation hub keeps me sharp. I’m exploring cutting-edge tooling, startups, and lifelong learning.',
        coordinates: '52.4°N / 4.9°E'
    }
];

const mapImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';

const PlayGlyph = ({ playing }) => (
    <svg viewBox="0 0 14 14" width="16" height="16" fill="currentColor" aria-hidden="true">
        {playing ? (
            <>
                <rect x="2" y="2" width="3" height="10" rx="1" />
                <rect x="9" y="2" width="3" height="10" rx="1" />
            </>
        ) : (
            <path d="M3 2.5L11.5 7 3 11.5V2.5Z" />
        )}
    </svg>
);

const AboutView = () => {
    const [activeLocation, setActiveLocation] = useState('netherlands');
    const { isPlaying, togglePlay, currentTrack, isLoading, progress, error, hasInlineAudio } = useSpotify();

    const activePlace = useMemo(
        () => locations.find(place => place.id === activeLocation) ?? locations[0],
        [activeLocation]
    );

    const handleLocationChange = (id) => setActiveLocation(id);

    const openSpotify = () => {
        if (currentTrack?.trackUrl) {
            window.open(currentTrack.trackUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const getLabelTransform = (x) => {
        if (x < 35) return 'translate(-120%, -160%)';
        if (x > 65) return 'translate(20%, -160%)';
        return 'translate(-50%, -160%)';
    };

    return (
        <div className="h-full w-full flex flex-col md:flex-row items-center justify-center gap-8 px-8 pt-20 pb-8 max-w-7xl mx-auto relative z-20">
            <div className="flex-1 flex flex-col gap-6 max-w-md w-full">
                <motion.div
                    className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <p className="uppercase text-sm tracking-[0.4em] text-primary/70 font-mono mb-3">Layer 01 · Profile</p>
                    <h2 className="text-4xl font-bold mb-4 text-gradient-premium">About Me</h2>
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                        I’m a full stack developer shaped by three cultures. From Yemen’s history, through Malaysia’s vibrant tech scene,
                        to the Netherlands where I’m building high-touch experiences.
                    </p>
                    <p className="text-gray-400 text-sm font-mono border-l-2 border-primary pl-4">
                        “Building digital experiences that feel alive.”
                    </p>
                </motion.div>

                <motion.div
                    className="glass-card p-6 rounded-2xl border border-white/10 bg-[#121212] relative overflow-hidden group shadow-xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1DB954]/15 via-transparent to-transparent opacity-70 pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 flex items-center gap-2 mb-4">
                        <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-[#1DB954] animate-pulse shadow-[0_0_12px_rgba(29,185,84,0.8)]' : 'bg-white/30'}`} />
                        <p className="text-xs text-[#1DB954] font-bold uppercase tracking-[0.3em]">
                            {isPlaying ? 'Currently Listening To' : 'Recently Played'}
                        </p>
                    </div>

                    <div className="relative flex gap-5">
                        {/* Album Art - BIGGER */}
                        <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-2xl shrink-0 border-2 border-white/10">
                            {isLoading ? (
                                <div className="w-full h-full bg-gray-800 animate-pulse" />
                            ) : (
                                <img
                                    src={currentTrack?.image}
                                    alt={currentTrack?.name || 'Album artwork'}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110 rotate-1' : 'scale-100'}`}
                                />
                            )}
                            {/* Vinyl effect overlay */}
                            {isPlaying && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20" />
                            )}
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0 relative z-10 flex flex-col justify-between">
                            {error ? (
                                <p className="text-sm text-red-400">{error}</p>
                            ) : (
                                <div className="space-y-1">
                                    <p className="text-base font-bold text-white line-clamp-2 leading-tight">
                                        {currentTrack?.name || (isLoading ? 'Fetching track...' : 'Track unavailable')}
                                    </p>
                                    <p className="text-sm text-gray-400 truncate">
                                        {currentTrack?.artist || (!isLoading && 'Artist unknown')}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {currentTrack?.album}
                                    </p>
                                </div>
                            )}

                            {/* Progress Bar */}
                            <div className="space-y-1.5">
                                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                    <motion.div
                                        className={`h-full ${isPlaying ? 'bg-[#1DB954]' : 'bg-white/30'}`}
                                        animate={{ width: `${Math.min(progress, 1) * 100}%` }}
                                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-400">
                                    <span>{isPlaying && hasInlineAudio ? 'Preview playing' : 'Tap to listen'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Row - COMPACT */}
                    <div className="relative z-10 flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                        <button
                            type="button"
                            onClick={hasInlineAudio ? togglePlay : openSpotify}
                            className="w-10 h-10 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1DB954]"
                            aria-label={isPlaying ? 'Pause Spotify preview' : 'Play Spotify preview'}
                        >
                            <PlayGlyph playing={isPlaying && hasInlineAudio} />
                        </button>

                        {currentTrack?.trackUrl && (
                            <button
                                type="button"
                                onClick={openSpotify}
                                className="text-[11px] text-[#1DB954] hover:text-white transition-colors font-semibold flex items-center gap-1"
                            >
                                Open Spotify
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="flex-1 w-full min-h-[450px] md:min-h-[500px] lg:h-[560px] rounded-[36px] border border-white/10 relative group shadow-[0_25px_100px_rgba(0,0,0,0.65)] bg-black/60"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 }}
                onMouseLeave={() => setActiveLocation('netherlands')}
            >
                <div className="absolute inset-0 rounded-[36px] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${mapImage}')`, filter: 'grayscale(90%) contrast(120%) brightness(55%)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,197,253,0.15),_transparent_55%)]" />
                </div>

                <div className="relative z-10 h-full w-full">
                    <div className="absolute inset-6 rounded-[28px] border border-white/5 pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.05)_95%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.05)_95%)] bg-[length:80px_80px] opacity-30 pointer-events-none" />

                    <div className="absolute top-6 right-6 w-[280px] max-w-[80%] z-30">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePlace.id}
                                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="bg-black/85 backdrop-blur-2xl border border-primary/50 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                            >
                                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-primary/70">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">📍</span>
                                        <span className="font-mono">Location data</span>
                                    </div>
                                    <span className="font-mono tracking-[0.2em] text-white/50">{activePlace.coordinates}</span>
                                </div>
                                <div className="border-t border-white/10 my-4" />
                                <p className="text-sm text-primary font-semibold">{activePlace.headline}</p>
                                <h3 className="text-2xl font-bold text-white leading-tight">{activePlace.name}</h3>
                                <p className="text-xs uppercase tracking-[0.4em] text-white/40 font-mono">{activePlace.timeline}</p>
                                <p className="text-sm text-gray-300 leading-relaxed mt-4">{activePlace.details}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {locations.map((place) => (
                        <div
                            key={place.id}
                            className="absolute z-20"
                            style={{ left: `${place.x}%`, top: `${place.y}%` }}
                            onMouseLeave={() => setActiveLocation('netherlands')}
                        >
                            <motion.button
                                type="button"
                                onMouseEnter={() => handleLocationChange(place.id)}
                                onFocus={() => handleLocationChange(place.id)}
                                onClick={() => handleLocationChange(place.id)}
                                aria-pressed={activeLocation === place.id}
                                className="relative w-6 h-6 -ml-3 -mt-3"
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
                                <span className={`absolute inset-1 rounded-full border-2 transition-colors duration-300 ${activeLocation === place.id ? 'border-[#1DB954]' : 'border-white/70'}`} />
                                <span className={`absolute inset-0 rounded-full transition-all duration-300 ${activeLocation === place.id ? 'bg-[#1DB954] scale-100' : 'bg-white scale-75'}`} />
                            </motion.button>

                            <AnimatePresence>
                                {activeLocation === place.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: -8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -8 }}
                                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                        className="absolute top-8 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl min-w-[140px] max-w-[180px] pointer-events-none"
                                    >
                                        <p className="text-xs font-bold text-white whitespace-nowrap">{place.name}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{place.description}</p>
                                        {/* Arrow pointing to dot */}
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 border-l border-t border-white/20 rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    <div className="absolute bottom-6 left-6 sm:left-auto sm:right-6 text-[11px] tracking-[0.35em] text-primary/70 font-mono border border-primary/40 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm shadow-lg">
                        COORD · {activePlace.name.toUpperCase()}
                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default AboutView;
