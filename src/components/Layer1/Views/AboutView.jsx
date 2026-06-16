import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import SpotifyPlayer from '../../shared/SpotifyPlayer';

const locations = [
    {
        id: 'yemen',
        name: 'Yemen',
        x: 61,
        y: 55,
        timeline: '0-4',
        details: 'Where I was born and where the story started.',
        coordinates: '15.3 N / 44.2 E'
    },
    {
        id: 'malaysia',
        name: 'Malaysia',
        x: 78,
        y: 58,
        timeline: '5-27',
        details: 'The place that feels like home, and where most of my personality was shaped.',
        coordinates: '3.1 N / 101.7 E'
    },
    {
        id: 'netherlands',
        name: 'Netherlands',
        x: 49,
        y: 36,
        timeline: 'Now',
        details: "Where I'm building the next chapter through design, code, and product work.",
        coordinates: '52.4 N / 4.9 E'
    }
];

const techGroups = [
    ['JavaScript', 'React', 'Tailwind CSS', 'TypeScript', 'HTML/CSS'],
    ['Node.js', 'Express', 'Firebase', 'Supabase', 'REST APIs'],
    ['Figma', 'Photoshop', 'Aseprite', 'Notion', 'GitHub']
];

const icons = {
    email: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M4 6.5h16v11H4z" stroke="currentColor" strokeWidth="1.8" />
            <path d="m5 7 7 6 7-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.83.1-.65.35-1.08.64-1.33-2.22-.25-4.55-1.1-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.04c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17" cy="7" r="1" fill="currentColor" />
        </svg>
    )
};

const contactLinks = [
    { label: 'Email', value: 'ajabood7788@gmail.com', href: 'mailto:ajabood7788@gmail.com', icon: icons.email },
    { label: 'GitHub', value: '@AjCodes', href: 'https://github.com/AjCodes', icon: icons.github },
    { label: 'Instagram', value: '@aboodmadridista', href: 'https://www.instagram.com/aboodmadridista/', icon: icons.instagram }
];

const HeartButton = () => {
    const [likes, setLikes] = useState(() => {
        const saved = localStorage.getItem('portfolio_likes');
        return saved ? parseInt(saved, 10) : 142;
    });
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        const next = likes + 1;
        setLikes(next);
        setLiked(true);
        localStorage.setItem('portfolio_likes', String(next));
    };

    return (
        <motion.button
            type="button"
            onClick={handleLike}
            className={`group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-2xl border px-6 py-3 text-sm font-bold transition-colors ${liked
                ? 'border-primary/55 bg-primary/14 text-white'
                : 'border-[#e8d8c9]/14 bg-[#e8d8c9]/6 text-[#e8d8c9]/75 hover:border-primary/45 hover:text-white'
                }`}
            whileTap={{ scale: 0.96 }}
            animate={liked ? { boxShadow: '0 0 34px rgba(243,112,30,0.24)' } : { boxShadow: '0 0 0 rgba(243,112,30,0)' }}
            aria-live="polite"
        >
            <motion.span
                className="text-2xl leading-none text-primary"
                animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.32 }}
            >
                {liked ? '♥' : '♡'}
            </motion.span>
            <span>{likes}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8d8c9]/45">
                {liked ? 'Thanks' : 'Appreciate'}
            </span>
        </motion.button>
    );
};

const JourneyMap = () => {
    const [activeLocation, setActiveLocation] = useState(null);
    const activePlace = useMemo(
        () => locations.find((place) => place.id === activeLocation),
        [activeLocation]
    );

    return (
        <div className="relative min-h-[19rem] overflow-hidden rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#080914] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
            <div
                className="absolute inset-0 opacity-75"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 60%',
                    filter: 'invert(1) hue-rotate(180deg) brightness(0.62) contrast(1.25)'
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(8,9,20,0.58)_56%,#080914_100%)]" />

            <div className="relative z-10 flex h-full min-h-[19rem] flex-col justify-between p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">My journey</p>
                    </div>
                    <div className="rounded-full border border-primary/20 bg-[#181818]/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8d8c9]/50">
                        Hover over dots
                    </div>
                </div>

                <div className="w-full max-w-xs">
                    <AnimatePresence mode="wait">
                        {activePlace && (
                            <motion.div
                                key={activePlace.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="rounded-2xl border border-primary/28 bg-[#151520]/90 p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                            >
                                <div className="mb-1 flex items-center justify-between gap-2">
                                    <h3 className="text-base font-bold text-white">{activePlace.name}</h3>
                                    <span className="font-mono text-[10px] text-primary">{activePlace.coordinates}</span>
                                </div>
                                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#e8d8c9]/38">{activePlace.timeline}</p>
                                <p className="border-t border-white/5 pt-2 text-xs leading-relaxed text-[#e8d8c9]/68">{activePlace.details}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <svg className="absolute inset-0 z-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="journeyLine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f3701e" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#f3701e" stopOpacity="0.82" />
                        </linearGradient>
                        <filter id="journeyGlow">
                            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>
                    <path
                        d={`M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 15} ${locations[1].x} ${locations[1].y}`}
                        fill="none"
                        stroke="url(#journeyLine)"
                        strokeDasharray="3 3"
                        strokeWidth="0.4"
                        opacity="0.6"
                    />
                    <path
                        d={`M ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 25} ${locations[2].x} ${locations[2].y}`}
                        fill="none"
                        stroke="url(#journeyLine)"
                        strokeDasharray="3 3"
                        strokeWidth="0.4"
                        opacity="0.6"
                    />
                    <path
                        id="combinedJourneyPath"
                        d={`M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 15} ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 25} ${locations[2].x} ${locations[2].y}`}
                        fill="none"
                        stroke="none"
                    />
                    <circle r="1" fill="#f3701e" filter="url(#journeyGlow)">
                        <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear">
                            <mpath href="#combinedJourneyPath" />
                        </animateMotion>
                    </circle>
                </svg>

                {locations.map((place) => (
                    <div key={place.id} className="absolute z-20" style={{ left: `${place.x}%`, top: `${place.y}%` }}>
                        <motion.button
                            type="button"
                            onMouseEnter={() => setActiveLocation(place.id)}
                            onMouseLeave={() => setActiveLocation(null)}
                            onFocus={() => setActiveLocation(place.id)}
                            onBlur={() => setActiveLocation(null)}
                            className="group relative flex h-8 w-8 -ml-4 -mt-4 items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            aria-label={place.name}
                        >
                            <span className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping group-hover:opacity-40" />
                            <span className="relative z-10 h-3 w-3 rounded-full border-2 border-primary bg-[#080914] shadow-[0_0_15px_rgba(243,112,30,0.9)] transition-colors group-hover:bg-primary" />
                        </motion.button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AboutView = () => {
    return (
        <section id="about" className="relative min-h-screen overflow-hidden bg-[#181818] px-6 py-14 sm:px-10 lg:pl-44 lg:pr-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(243,112,30,0.12),transparent_24%),radial-gradient(circle_at_84%_40%,rgba(75,96,127,0.22),transparent_30%)]" />
            <div className="relative z-10 mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="grid gap-5">
                    <motion.div
                        className="rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#181818]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-6"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <h2 className="font-display text-3xl font-bold leading-tight text-[#e8d8c9] sm:text-[2.35rem]">
                            <span className="text-primary">I build things</span> that stick with people.
                        </h2>
                        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#e8d8c9]/72">
                            <p>
                                I&apos;ve always been drawn to mixing ideas from different worlds: psychology, design, tech, whatever it takes to make something feel right.
                            </p>
                            <p>
                                I&apos;m also detailed to a fault. The kind of person who will spend way too long on something most people won&apos;t even notice. But those small things add up.
                            </p>
                            <p>
                                Lately I&apos;ve been obsessed with automating the boring parts of my workflow. It frees up space for the work that actually matters.
                            </p>
                        </div>

                        <div className="mt-5 border-t border-[#e8d8c9]/10 pt-4">
                            <p className="font-mono text-sm italic tracking-[0.08em] text-[#e8d8c9]/55">
                                &quot;Learning by doing, one project at a time.&quot;
                            </p>
                        </div>

                        <div className="mt-4">
                            <SpotifyPlayer inline />
                        </div>
                    </motion.div>

                    <motion.div
                        className="rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#181818]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">Tech stack</span>
                        </div>
                        <div className="grid gap-3">
                            {techGroups.map((group, index) => (
                                <div key={index} className="flex flex-wrap gap-2">
                                    {group.map((tech) => (
                                        <span key={tech} className="rounded-lg border border-[#e8d8c9]/10 bg-[#e8d8c9]/5 px-3 py-1.5 text-xs font-semibold text-[#e8d8c9]/70">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="grid gap-5">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ delay: 0.08 }}
                    >
                        <JourneyMap />
                    </motion.div>

                    <motion.div
                        className="rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#181818]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                    >
                    <div className="grid gap-5 lg:grid-cols-[0.76fr_1.24fr]">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="font-display text-2xl font-bold leading-tight text-[#e8d8c9] sm:text-3xl">
                                    Let&apos;s Connect
                                </p>
                                <span className="inline-flex items-center gap-2 rounded-full border border-green-400/25 bg-green-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-green-300 shadow-[0_0_24px_rgba(74,222,128,0.08)]">
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,0.75)]" />
                                    Available for work
                                </span>
                            </div>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#e8d8c9]/66">
                                I&apos;m always looking for new challenges. If you like my work, consider supporting so I can keep building cool open-source products.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <a href="https://buymeacoffee.com/ajcodex" target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(243,112,30,0.22)] transition-transform hover:-translate-y-0.5">
                                    Buy Me a Coffee
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[#e8d8c9]/10 bg-[#e8d8c9]/5 px-4 py-2.5 transition-colors hover:border-primary/45 hover:bg-primary/10"
                                >
                                    <span className="flex min-w-0 items-center gap-3">
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e8d8c9]/10 bg-[#080808]/55 text-[#e8d8c9]/72 transition-colors group-hover:border-primary/40 group-hover:text-primary">
                                            {link.icon}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{link.label}</span>
                                            <span className="mt-1 block truncate text-sm font-semibold text-[#e8d8c9]">{link.value}</span>
                                        </span>
                                    </span>
                                    <span className="text-[#e8d8c9]/35 transition-transform group-hover:translate-x-1 group-hover:text-primary">→</span>
                                </a>
                            ))}
                            <HeartButton />
                        </div>
                    </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutView;
