import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';

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
        timeline: '5 – 27 yrs',
        description: 'Where i grew up and became who i am.',
        details: 'Where i grew up and became who i am.',
        coordinates: '3.1°N / 101.7°E'
    },
    {
        id: 'netherlands',
        name: 'Netherlands',
        x: 49,
        y: 36,
        headline: 'Current Base',
        timeline: '28 yrs – Present',
        description: "Where i'm putting it all together.",
        details: "Where i'm putting it all together.",
        coordinates: '52.4°N / 4.9°E'
    }
];

const LikeButton = () => {
    const [likes, setLikes] = useState(() => {
        const saved = localStorage.getItem('portfolio_likes');
        return saved ? parseInt(saved, 10) : 142;
    });
    // Toggle for animation state
    const [animState, setAnimState] = useState(false);

    const handleLike = () => {
        const newLikes = likes + 1;
        setLikes(newLikes);
        localStorage.setItem('portfolio_likes', newLikes.toString());

        // Trigger generic click animation
        setAnimState(true);
        setTimeout(() => setAnimState(false), 200);
    };

    return (
        <motion.button
            onClick={handleLike}
            className="flex-1 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 text-gray-400 hover:text-red-400 transition-all flex items-center justify-center gap-2 group relative overflow-hidden active:scale-95"
            whileTap={{ scale: 0.9 }}
        >
            <motion.svg
                className={`w-5 h-5 transition-colors ${animState ? 'text-red-500 fill-red-500' : 'fill-none'}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ scale: animState ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.2 }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </motion.svg>
            <span className="text-xs font-semibold font-mono">{likes}</span>
        </motion.button>
    );
};

const AboutView = () => {
    const [activeLocation, setActiveLocation] = useState(null);

    const activePlace = useMemo(
        () => locations.find(place => place.id === activeLocation),
        [activeLocation]
    );

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-2 px-6 pt-2 pb-4 max-w-7xl mx-auto relative z-20">

            {/* Left Column - Bio, Socials, Contact (5 Cols) */}
            <div className="md:col-span-5 flex flex-col gap-2">
                {/* About Text Card */}
                <motion.div
                    className="glass-card p-4 rounded-[20px] border border-white/5 bg-black/20 backdrop-blur-xl"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <div className="mb-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-gradient-premium leading-tight">I build things that stick with people.</h2>
                    </div>
                    <div className="space-y-2 text-gray-300 leading-relaxed text-sm">
                        <p>
                            i've always been drawn to mixing ideas from different worlds. psychology, design, tech, whatever it takes to make something feel right.
                        </p>
                        <p>
                            i'm also detailed to a fault. the kind of person who will spend way too long on something most people won't even notice. but those small things add up.
                        </p>
                        <p>
                            lately i've been obsessed with automating the boring parts of my workflow. frees up space for the work that actually matters.
                        </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5">
                        <p className="text-gray-400 text-sm font-mono italic">
                            "Learning by doing, one project at a time."
                        </p>
                    </div>
                </motion.div>


                {/* Let's Connect Card - Now includes social icons */}
                <motion.div
                    className="glass-card p-5 rounded-[24px] border border-white/5 bg-black/20 backdrop-blur-xl flex flex-col gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white">Let's Connect</h3>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md shrink-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-green-400 tracking-wide uppercase">Available for work</span>
                        </div>
                    </div>

                    {/* Social Icons Row */}
                    <div className="flex gap-2">
                        {/* GitHub */}
                        <a href="https://github.com/AjCodes" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-gray-400 hover:text-white transition-all flex items-center justify-center group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/aboodmadridista/" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E1306C]/50 text-gray-400 hover:text-white transition-all flex items-center justify-center group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.535c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.821-.049.975-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.812-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a href="#" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0077b5]/50 text-gray-400 hover:text-white transition-all flex items-center justify-center group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>

                        {/* Like Counter */}
                        <LikeButton />
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed">
                        I'm always looking for new challenges. If you like my work, consider supporting so I can keep building cool open-source products!
                    </p>

                    <a href="https://buymeacoffee.com/ajcodex" target="_blank" rel="noopener noreferrer"
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zm0 0V6a2 2 0 012-2h10a2 2 0 012 2v2" />
                        </svg>
                        Buy Me a Coffee
                    </a>
                </motion.div>
            </div>

            {/* Right Column - Map (7 Cols) - Tech Stack Removed from here */}
            <div className="md:col-span-7 h-[500px] md:h-auto">
                <motion.div
                    className="h-full rounded-[24px] border border-white/5 relative group shadow-2xl bg-[#0B0B15] overflow-hidden"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 60%',
                            filter: 'invert(1) hue-rotate(180deg) brightness(0.7) contrast(1.2)'
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#0B0B15]/50 to-[#0B0B15]" />

                    <div className="relative z-10 h-full w-full p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold tracking-widest text-primary uppercase drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                                My Journey
                            </h3>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A2E] border border-primary/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Hover dots to explore</span>
                            </div>
                        </div>

                        <div className="w-[280px]">
                            <AnimatePresence mode="wait">
                                {activePlace && (
                                    <motion.div
                                        key={activePlace.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="bg-[#151520]/90 backdrop-blur-xl border border-primary/30 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-base font-bold text-white">{activePlace.name}</h3>
                                            <span className="text-[10px] text-primary font-mono">{activePlace.coordinates}</span>
                                        </div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">{activePlace.timeline}</p>
                                        <p className="text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-2">{activePlace.details}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="hsl(15, 85%, 55%)" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="hsl(15, 85%, 55%)" stopOpacity="0.8" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs>

                            <path
                                id="path1"
                                d={`M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 15} ${locations[1].x} ${locations[1].y}`}
                                fill="none" stroke="url(#gradientLine)" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.6"
                            />
                            <path
                                id="path2"
                                d={`M ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 25} ${locations[2].x} ${locations[2].y}`}
                                fill="none" stroke="url(#gradientLine)" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.6"
                            />

                            {/* Hidden Combined Path for Animation */}
                            <path
                                id="combinedPath"
                                d={`M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 15} ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 25} ${locations[2].x} ${locations[2].y}`}
                                fill="none" stroke="none"
                            />

                            <circle r="1" fill="hsl(15, 85%, 55%)" filter="url(#glow)">
                                <animateMotion dur="4s" repeatCount="indefinite" begin="0s" calcMode="linear">
                                    <mpath href="#combinedPath" />
                                </animateMotion>
                            </circle>
                        </svg>

                        {locations.map((place) => (
                            <div key={place.id} className="absolute" style={{ left: `${place.x}%`, top: `${place.y}%` }}>
                                <motion.button
                                    type="button"
                                    onMouseEnter={() => setActiveLocation(place.id)}
                                    onMouseLeave={() => setActiveLocation(null)}
                                    className="group relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <span className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping group-hover:opacity-40" />
                                    <div className="w-3 h-3 bg-[#0B0B15] rounded-full border-2 border-primary shadow-[0_0_15px_#F97316] relative z-10 group-hover:bg-primary transition-colors" />
                                    {activeLocation === place.id && (
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 w-[100px] h-[1px] bg-gradient-to-r from-primary to-transparent origin-left -z-10"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1, rotate: 135 }}
                                        />
                                    )}
                                </motion.button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row - Tech Stack (12 Cols - Expanded Horizontal) */}
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
                            {['JavaScript', 'HTML/CSS', 'Vite', 'React', 'Tailwind CSS', 'TypeScript'].map((tech) => (
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
                            {['Node.js', 'Express', 'Python', 'REST APIs', 'Supabase', 'Firebase', 'MySQL'].map((tech) => (
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
                            {['Git', 'GitHub', 'Bun', 'Notion', 'Terminal/CLI'].map((tech) => (
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
                            {['Figma', 'Photoshop', 'Aseprite', 'Canva'].map((tech) => (
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
                            {['Vercel', 'Docker', 'Railway'].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default AboutView;
