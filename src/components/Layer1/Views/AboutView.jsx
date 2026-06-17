import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import SpotifyPlayer from '../../shared/SpotifyPlayer';
import ScrollReveal from '../../../components/shared/ScrollReveal';

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
        return saved ? parseInt(saved, 10) : 145;
    });
    const [liked, setLiked] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadLikes = async () => {
            try {
                const response = await fetch('/api/likes', { cache: 'no-store' });
                if (!response.ok) return;

                const data = await response.json();
                if (isMounted && Number.isFinite(data.count)) {
                    setLikes(data.count);
                    localStorage.setItem('portfolio_likes', String(data.count));
                }
            } catch {
                // Local Vite dev does not run Vercel functions; keep local fallback.
            }
        };

        loadLikes();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleLike = async () => {
        const next = likes + 1;
        setLikes(next);
        setLiked(true);
        localStorage.setItem('portfolio_likes', String(next));
        setIsSyncing(true);

        try {
            const response = await fetch('/api/likes', {
                method: 'POST',
                headers: { Accept: 'application/json' },
            });

            if (!response.ok) return;

            const data = await response.json();
            if (Number.isFinite(data.count)) {
                setLikes(data.count);
                localStorage.setItem('portfolio_likes', String(data.count));
            }
        } catch {
            // Keep the optimistic local increment if shared storage is unavailable.
        } finally {
            setIsSyncing(false);
        }
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
                {liked ? (isSyncing ? 'Saving' : 'Thank you') : ''}
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
        <div className="relative min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#080914] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
            <div
                className="absolute inset-0 opacity-82"
                style={{
                    backgroundImage: "url('/media/world-map.svg')",
                    backgroundSize: '92% auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center 56%',
                    filter: 'invert(1) hue-rotate(180deg) brightness(0.72) contrast(1.18)'
                }}
            />
            <div className="absolute inset-0 bg-[#080914]/30" />

            <div className="relative z-10 flex h-full min-h-[18rem] flex-col justify-between p-5">
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

                <svg
                    className="absolute inset-0 z-0 h-full w-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    shapeRendering="geometricPrecision"
                >
                    <defs>
                        <linearGradient id="journeyLine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff9a4a" stopOpacity="0.76" />
                            <stop offset="100%" stopColor="#f3701e" stopOpacity="1" />
                        </linearGradient>
                        <filter id="journeyGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="0.32" result="coloredBlur" />
                            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                        <filter id="journeyMarkerGlow" x="-80%" y="-80%" width="260%" height="260%">
                            <feGaussianBlur stdDeviation="1.1" result="markerBlur" />
                            <feMerge><feMergeNode in="markerBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>
                    {[
                        `M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 15} ${locations[1].x} ${locations[1].y}`,
                        `M ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 25} ${locations[2].x} ${locations[2].y}`
                    ].map((path) => (
                        <g key={path}>
                            <path
                                d={path}
                                fill="none"
                                stroke="#f3701e"
                                strokeWidth="1.45"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.18"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                d={path}
                                fill="none"
                                stroke="url(#journeyLine)"
                                strokeWidth="0.72"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.98"
                                filter="url(#journeyGlow)"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                d={path}
                                fill="none"
                                stroke="#ffd0ad"
                                strokeDasharray="0.01 4.2"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                opacity="0.72"
                                vectorEffect="non-scaling-stroke"
                            />
                        </g>
                    ))}
                    <path
                        id="combinedJourneyPath"
                        d={`M ${locations[0].x} ${locations[0].y} Q ${(locations[0].x + locations[1].x) / 2} ${Math.min(locations[0].y, locations[1].y) - 15} ${locations[1].x} ${locations[1].y} Q ${(locations[1].x + locations[2].x) / 2} ${Math.min(locations[1].y, locations[2].y) - 25} ${locations[2].x} ${locations[2].y}`}
                        fill="none"
                        stroke="none"
                    />
                    <g filter="url(#journeyMarkerGlow)">
                        <circle r="2.15" fill="#f3701e" opacity="0.2" />
                        <circle r="1.05" fill="#f3701e" stroke="#ffd0ad" strokeWidth="0.18" vectorEffect="non-scaling-stroke" />
                        <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear">
                            <mpath href="#combinedJourneyPath" />
                        </animateMotion>
                    </g>
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
        <section id="about" className="relative flex min-h-screen items-center overflow-hidden bg-[#151515] px-6 py-10 sm:px-10 lg:pl-44 lg:pr-10">
            <div className="pointer-events-none absolute inset-0 bg-[#151515]" />
            <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="grid gap-3">
                    <ScrollReveal
                        preset="fade-right"
                        delay={0}
                    >
                        <div className="rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#181818]/82 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                            <h2 className="font-display text-3xl font-bold leading-tight text-[#e8d8c9] sm:text-[2.05rem]">
                                <span className="text-primary">I build things</span> that stick with people.
                            </h2>
                            <div className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-[#e8d8c9]/72 sm:text-sm">
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

                            <div className="mt-4 border-t border-[#e8d8c9]/10 pt-4">
                                <p className="font-mono text-xs italic tracking-[0.08em] text-[#e8d8c9]/55">
                                    &quot;Learning by doing, one project at a time.&quot;
                                </p>
                            </div>

                            <div className="mt-4">
                                <SpotifyPlayer inline />
                            </div>

                            <div className="mt-4 border-t border-[#e8d8c9]/10 pt-4">
                                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-primary">Tech stack</p>
                                <ScrollReveal preset="scale-in" stagger={0.03} className="flex flex-wrap gap-2">
                                    {techGroups.flat().map((tech) => (
                                        <span key={tech} className="rounded-lg border border-[#e8d8c9]/10 bg-[#e8d8c9]/5 px-2.5 py-1 text-[11px] font-semibold text-[#e8d8c9]/70">
                                            {tech}
                                        </span>
                                    ))}
                                </ScrollReveal>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="grid gap-5">
                    <ScrollReveal
                        preset="fade-left"
                        delay={0.15}
                    >
                        <JourneyMap />
                    </ScrollReveal>

                    <ScrollReveal
                        preset="fade-up"
                        delay={0.25}
                    >
                        <div className="rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#181818]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                        <div>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p className="font-display text-2xl font-bold leading-tight text-[#e8d8c9] sm:text-[1.65rem]">
                                        Let&apos;s Connect
                                    </p>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-green-400/25 bg-green-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-green-300 shadow-[0_0_24px_rgba(74,222,128,0.08)]">
                                        <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,0.75)]" />
                                        Available for work
                                    </span>
                                </div>
                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#e8d8c9]/66">
                                    I&apos;m always looking for new challenges. If you like my work, consider supporting so I can keep building cool open-source products.
                                </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-[auto_1fr]">
                                <ScrollReveal preset="fade-up" stagger={0.08} className="flex gap-3">
                                    {contactLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target={link.href.startsWith('http') ? '_blank' : undefined}
                                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="group grid h-12 w-12 place-items-center rounded-2xl border border-[#e8d8c9]/10 bg-[#e8d8c9]/5 text-[#e8d8c9]/72 transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-primary"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </ScrollReveal>
                                <HeartButton />
                            </div>
                            <a href="https://buymeacoffee.com/ajcodex" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/24 bg-primary/72 px-4 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(243,112,30,0.14)] transition-transform hover:-translate-y-0.5 hover:bg-primary/82">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                    <path d="M5 8h10v6.5A4.5 4.5 0 0 1 10.5 19h-1A4.5 4.5 0 0 1 5 14.5V8Z" stroke="currentColor" strokeWidth="1.8" />
                                    <path d="M15 10h2a2.5 2.5 0 0 1 0 5h-2" stroke="currentColor" strokeWidth="1.8" />
                                    <path d="M8 5.5V4M11 5.5V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                                Buy Me a Coffee
                            </a>
                        </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default AboutView;
