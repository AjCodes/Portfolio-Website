import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useSpotify } from '../../../context/SpotifyContext';

// Locations for the world map
const locations = [
    {
        id: 'yemen',
        name: 'Yemen',
        x: 61,
        y: 55,
        headline: 'Origins',
        timeline: '0 – 4 yrs',
        description: 'Where i was born and where everything started.',
        details: 'Where i was born and where everything started.',
        coordinates: '15.3°N / 44.2°E'
    },
    {
        id: 'malaysia',
        name: 'Malaysia',
        x: 78,
        y: 58,
        headline: 'Growth Phase',
        timeline: '4 – 18 yrs',
        description: 'Where i grew up and became who i am.',
        details: 'Where i grew up and became who i am.',
        coordinates: '3.1°N / 101.7°E'
    },
    {
        id: 'netherlands',
        name: 'Netherlands',
        x: 49,
        y: 28,
        headline: 'Current Base',
        timeline: '2018 – Present',
        description: "Where i'm putting it all together.",
        details: "Where i'm putting it all together.",
        coordinates: '52.4°N / 4.9°E'
    }
];

// Journey path coordinates (percentages matching location dots)
const journeyPath = [
    { x: 61, y: 55 },  // Yemen
    { x: 78, y: 58 },  // Malaysia
    { x: 49, y: 28 }   // Netherlands
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
    // null = no location selected (only show on hover)
    const [activeLocation, setActiveLocation] = useState(null);
    const { isPlaying, togglePlay, currentTrack, isLoading, progress, error, hasInlineAudio } = useSpotify();

    const activePlace = useMemo(
        () => locations.find(place => place.id === activeLocation),
        [activeLocation]
    );

    const openSpotify = () => {
        if (currentTrack?.trackUrl) {
            window.open(currentTrack.trackUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 px-6 pt-14 pb-4 max-w-7xl mx-auto relative z-20">

            {/* Left Column - About Text + Spotify + Socials */}
            <div className="md:col-span-5 flex flex-col gap-3">
                {/* About Text Card - Starts at top */}
                <motion.div
                    className="glass-card p-5 rounded-[24px] border border-white/5 bg-black/20 backdrop-blur-xl"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gradient-premium leading-tight">I build things that stick with people.</h2>
                    <div className="space-y-2 text-gray-300 leading-relaxed text-sm">
                        <p>
                            i've always been drawn to mixing ideas from different worlds. psychology, design, tech, whatever it takes to make something feel right. i don't like tunnel vision. when there's a problem in front of me, i need to see it from every angle before i can move forward.
                        </p>
                        <p>
                            i'm also detailed to a fault. the kind of person who will spend way too long on something most people won't even notice. but those small things add up, and i think that's what separates good from forgettable.
                        </p>
                        <p>
                            lately i've been obsessed with automating the boring parts of my workflow. if a task feels repetitive, i'd rather spend a few hours making it disappear forever than do it manually one more time. frees up space for the work that actually matters.
                        </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5">
                        <p className="text-gray-400 text-sm font-mono italic">
                            "Learning by doing, one project at a time."
                        </p>
                    </div>
                </motion.div>

                {/* Spotify Card - Bigger */}
                <motion.div
                    className="glass-card p-4 rounded-[20px] border border-white/10 bg-[#121212] relative overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                    <div className="relative flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg shrink-0 border border-white/10">
                            {isLoading ? <div className="w-full h-full bg-gray-800 animate-pulse" /> : (
                                <img src={currentTrack?.image} alt={currentTrack?.name || 'Album'} className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`} />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center"><div className="w-2 h-2 bg-[#121212] rounded-full border border-white/10" /></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#1DB954] animate-pulse' : 'bg-white/30'}`} />
                                <p className="text-[9px] text-[#1DB954] font-bold uppercase tracking-widest">{isPlaying ? 'Now Playing' : 'Recently Played'}</p>
                            </div>
                            <p className="text-base font-bold text-white line-clamp-1">{currentTrack?.name || 'Fetching...'}</p>
                            <p className="text-sm text-gray-400 line-clamp-1">{currentTrack?.artist || 'Unknown Artist'}</p>
                        </div>
                        <button onClick={hasInlineAudio ? togglePlay : openSpotify} className="px-4 py-2 rounded-full bg-[#1DB954] text-black text-sm font-bold hover:bg-[#1ed760] transition-colors flex items-center gap-1.5">
                            <PlayGlyph playing={isPlaying && hasInlineAudio} />
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                </motion.div>

                {/* Social Icons Row */}
                <motion.div
                    className="flex gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <a href="https://github.com/AjCodes" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-gray-400 hover:text-white transition-all flex items-center justify-center group">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/aboodmadridista/" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E1306C]/50 text-gray-400 hover:text-white transition-all flex items-center justify-center group">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.535c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.821-.049.975-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.812-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer"
                        className="flex-1 h-10 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 hover:from-primary/30 hover:to-purple-500/30 border border-primary/30 hover:border-primary/50 text-white transition-all flex items-center justify-center gap-2 group">
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-xs font-semibold">Support</span>
                    </a>
                </motion.div>
            </div>

            {/* Right Column - Map Only */}
            <div className="md:col-span-7">

                {/* Map - same height as left column */}
                <motion.div
                    className="h-full rounded-[24px] border border-white/10 relative group shadow-[0_25px_100px_rgba(0,0,0,0.65)] bg-[#101014] overflow-hidden"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Map Background */}
                    <div className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `url('${mapImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'grayscale(100%) contrast(150%) brightness(50%)'
                        }}
                    />

                    <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDhoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] opacity-30" />

                    <div className="relative z-10 h-full w-full p-6">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <span className="text-xs font-bold tracking-widest text-white uppercase">My Journey</span>
                        </div>

                        {/* Info card - bigger */}
                        <div className="absolute bottom-4 left-4 w-[320px] z-30 pointer-events-none">
                            <AnimatePresence mode="wait">
                                {activePlace && (
                                    <motion.div
                                        key={activePlace.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        className="bg-black/90 backdrop-blur-xl border border-primary/50 rounded-2xl p-4 shadow-2xl"
                                    >
                                        <p className="text-[10px] font-semibold text-primary mb-1">{activePlace.headline}</p>
                                        <h3 className="text-lg font-bold text-white">{activePlace.name}</h3>
                                        <p className="text-[9px] uppercase tracking-widest text-white/40 font-mono">{activePlace.timeline}</p>
                                        <p className="text-xs text-gray-300 mt-2 leading-relaxed">{activePlace.details}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Journey Path SVG */}
                        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs>
                            <path
                                d={`M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 12}, ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 15}, ${locations[2].x} ${locations[2].y}`}
                                fill="none" stroke="#22d3ee" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.5" filter="url(#glow)"
                            />
                            <circle r="0.8" fill="#22d3ee" filter="url(#glow)">
                                <animateMotion dur="5s" repeatCount="indefinite" path={`M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 12}, ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 15}, ${locations[2].x} ${locations[2].y}`} />
                            </circle>
                        </svg>

                        {/* Location dots */}
                        {locations.map((place) => (
                            <div key={place.id} className="absolute z-20" style={{ left: `${place.x}%`, top: `${place.y}%` }}>
                                <motion.button
                                    type="button"
                                    onMouseEnter={() => setActiveLocation(place.id)}
                                    onMouseLeave={() => setActiveLocation(null)}
                                    className="relative w-5 h-5 -ml-2.5 -mt-2.5"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <span className={`absolute inset-0 rounded-full blur-md transition-colors ${activeLocation === place.id ? 'bg-[#22d3ee]' : 'bg-white/20'}`} />
                                    <span className={`absolute inset-1 rounded-full border transition-colors ${activeLocation === place.id ? 'border-[#22d3ee] bg-[#101014]' : 'border-white/60 bg-[#101014]'}`} />
                                    <span className={`absolute inset-[5px] rounded-full transition-all ${activeLocation === place.id ? 'bg-[#22d3ee]' : 'bg-white'}`} />
                                </motion.button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Tech Stack Section - Full Width */}
            <motion.div
                className="md:col-span-12 glass-card p-4 rounded-[20px] border border-white/10 bg-black/30 backdrop-blur-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="text-xs font-bold tracking-widest text-white uppercase">Tech Stack</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {/* Frontend */}
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Frontend</p>
                        <div className="flex flex-wrap gap-1.5">
                            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Backend */}
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Backend</p>
                        <div className="flex flex-wrap gap-1.5">
                            {['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                            {['Git', 'GitHub', 'VS Code', 'Postman', 'npm'].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Design */}
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Design</p>
                        <div className="flex flex-wrap gap-1.5">
                            {['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Cloud & DevOps */}
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Cloud & DevOps</p>
                        <div className="flex flex-wrap gap-1.5">
                            {['AWS', 'Vercel', 'Docker', 'CI/CD', 'Linux'].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutView;
