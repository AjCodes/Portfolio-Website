import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../../data/projects';
import ScrollReveal from '../../../components/shared/ScrollReveal';

const ProjectPoster = ({ project }) => {
    if (project.id === 'smart-roads') {
        return (
        <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#101820] md:min-h-[24rem]">
                <div className="absolute bottom-5 left-5 right-5 top-5 rounded-[1.2rem] border border-[#e8d8c9]/10 bg-black/22 md:bottom-8 md:left-8 md:right-8 md:top-8" />
                <div className="absolute left-[12%] top-[18%] h-[68%] w-px bg-[#e8d8c9]/18" />
                <div className="absolute left-[42%] top-[12%] h-[76%] w-px bg-[#e8d8c9]/18" />
                <div className="absolute left-[8%] right-[10%] top-[48%] h-px bg-[#e8d8c9]/18" />
                <div className="absolute left-[8%] right-[10%] top-[72%] h-px bg-[#e8d8c9]/18" />
                {[['18%', '45%', '#ef4444'], ['24%', '45%', '#facc15'], ['30%', '45%', '#22c55e'], ['55%', '68%', '#22c55e'], ['61%', '68%', '#facc15'], ['67%', '68%', '#ef4444']].map(([left, top, color]) => (
                    <span key={`${left}-${top}`} className="absolute h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]" style={{ left, top, color, backgroundColor: color }} />
                ))}
                <div className="absolute right-5 top-5 w-36 rounded-2xl border border-[#4b607f]/45 bg-[#181818]/78 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-xl md:right-10 md:top-10 md:w-48 md:p-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8d8c9]/48">live data</p>
                    <div className="mt-4 space-y-2">
                        <span className="block h-2 w-4/5 rounded-full bg-[#4b607f]" />
                        <span className="block h-2 w-3/5 rounded-full bg-primary/70" />
                        <span className="block h-2 w-11/12 rounded-full bg-[#e8d8c9]/20" />
                    </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-auto">
                    <p className="font-display text-3xl font-bold text-[#e8d8c9] md:text-4xl">Smart Roads</p>
                    <p className="mt-2 max-w-xs text-sm text-[#e8d8c9]/58">Prototype, sensors, traffic logic, and backend signals in one system.</p>
                </div>
            </div>
        );
    }

    if (project.id === 'focusup') {
        return (
            <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#121212] md:min-h-[24rem]">
                <div className="absolute left-1/2 top-1/2 h-[20rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.2rem] border border-[#e8d8c9]/18 bg-[#181818] p-4 shadow-[0_26px_90px_rgba(0,0,0,0.48)] md:h-[25rem] md:w-[14rem]">
                    <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-[#e8d8c9]/20" />
                    <div className="rounded-2xl bg-primary/12 p-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Pomodoro</p>
                        <p className="mt-3 font-display text-4xl font-bold text-[#e8d8c9]">25:00</p>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {['Tasks', 'Habits', 'Rewards', 'Progress'].map((item) => (
                            <div key={item} className="rounded-xl border border-[#e8d8c9]/10 bg-[#e8d8c9]/5 p-3">
                                <span className="mb-4 block h-2 w-2 rounded-full bg-primary" />
                                <p className="text-xs font-bold text-[#e8d8c9]/72">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-auto">
                    <p className="font-display text-3xl font-bold text-[#e8d8c9] md:text-4xl">FocusUp</p>
                    <p className="mt-2 max-w-xs text-sm text-[#e8d8c9]/58">A productivity app shaped around momentum, habits, and small wins.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#141313] md:min-h-[24rem]">
            <div className="absolute left-5 top-5 grid h-36 w-36 place-items-center rounded-full border border-primary/18 bg-[#e8d8c9]/5 md:left-12 md:top-12 md:h-64 md:w-64">
                <img src="/media/projects/cardan-logo.png" alt="" className="w-24 rounded-xl bg-white/92 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:w-44 md:p-3" />
            </div>
            <div className="absolute right-5 top-5 rounded-2xl border border-[#e8d8c9]/10 bg-[#181818]/74 p-3 backdrop-blur-xl md:right-10 md:top-10 md:p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">motor symptom lens</p>
                <div className="mt-4 flex h-20 w-32 items-center justify-center md:mt-5 md:h-28 md:w-44">
                    <svg viewBox="0 0 160 90" className="h-full w-full">
                        <motion.path
                            d="M8 48 C 22 12, 40 76, 55 44 S 86 22, 99 49 S 130 78, 152 34"
                            fill="none"
                            stroke="#f3701e"
                            strokeWidth="4"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                        />
                    </svg>
                </div>
            </div>
            <div className="absolute bottom-5 left-5 h-24 w-36 rounded-[1.4rem] border border-[#e8d8c9]/14 bg-[#e8d8c9]/7 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:bottom-12 md:left-12 md:h-36 md:w-52 md:rounded-[2rem] md:p-5">
                <div className="flex gap-2">
                    {[0, 1, 2, 3].map((item) => (
                        <span key={item} className="h-8 w-5 rounded-full border border-primary/30 bg-primary/10 md:h-12 md:w-7" />
                    ))}
                </div>
                <p className="mt-3 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#e8d8c9]/48 md:mt-5 md:text-[10px] md:tracking-[0.18em]">interactive empathy</p>
            </div>
            <div className="absolute bottom-6 right-6 max-w-[13rem] text-right md:bottom-10 md:right-10 md:max-w-xs">
                <p className="font-display text-2xl font-bold leading-tight text-[#e8d8c9] md:text-4xl">Cardan Accessibility Project</p>
                <p className="mt-2 text-xs text-[#e8d8c9]/58 md:text-sm">An accessibility experience designed around interaction, awareness, and empathy.</p>
            </div>
        </div>
    );
};

const MediaViewer = ({ media }) => (
    <div className="grid h-full min-h-[24rem] gap-3 overflow-hidden rounded-[1.5rem] border border-[#e8d8c9]/12 bg-black/72 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
        <div className="flex items-center gap-2 border-b border-[#e8d8c9]/10 px-2 pb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8d8c9]/42">project media</span>
        </div>
        <div className={`grid gap-3 ${media.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {media.map((item) => (
                <div key={item.src} className="overflow-hidden rounded-2xl border border-[#e8d8c9]/10 bg-[#050505]">
                    <div className="border-b border-[#e8d8c9]/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8d8c9]/52">
                        {item.label}
                    </div>
                    {item.type === 'image' ? (
                        <img src={item.src} alt={item.label} className="h-[21rem] w-full object-contain" loading="lazy" />
                    ) : (
                        <video
                            key={item.src}
                            src={item.src}
                            className="h-[21rem] w-full bg-black object-contain"
                            controls
                            muted
                            playsInline
                            preload="metadata"
                        />
                    )}
                </div>
            ))}
        </div>
    </div>
);

const ProjectCard = ({ project }) => {
    const [activeTag, setActiveTag] = useState(null);
    const selectedTag = project.tags.find((tag) => tag.id === activeTag);

    return (
        <article data-native-scroll data-testid="project-card" className="grid w-full grid-cols-1 gap-4 rounded-[1.5rem] border border-[#e8d8c9]/10 bg-[#181818]/82 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl md:min-h-[32rem] md:rounded-[1.75rem] md:p-4 lg:grid-cols-[0.38fr_0.62fr] lg:p-5">
            <div className="flex flex-col justify-between p-1 lg:p-3">
                <div>
                    <p className="font-mono text-3xl font-bold leading-none text-primary/20 md:text-5xl">{project.number}</p>
                    <div className="mt-2 inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        {project.type}
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-[#e8d8c9] md:text-3xl lg:text-4xl">
                        {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#e8d8c9]/66 md:text-sm">{project.description}</p>
                </div>

                <div className="mt-4">
                    <div className="rounded-2xl border border-[#e8d8c9]/10 bg-[#e8d8c9]/5 p-3">
                        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8d8c9]/40">Role</p>
                        <p className="text-sm leading-relaxed text-[#e8d8c9]/68">{project.role}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => setActiveTag(activeTag === tag.id ? null : tag.id)}
                                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${activeTag === tag.id
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-[#e8d8c9]/14 bg-[#181818]/68 text-[#e8d8c9]/62 hover:border-primary/55 hover:text-[#e8d8c9]'
                                    }`}
                            >
                                {tag.label}
                            </button>
                        ))}
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="project-link"
                            className="rounded-full border border-[#e8d8c9]/14 bg-[#e8d8c9]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#e8d8c9]/68 transition-colors hover:border-primary/55 hover:text-white"
                        >
                            View project
                        </a>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedTag?.id || `${project.id}-poster`}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.28 }}
                    className="min-h-[18rem] md:min-h-[24rem]"
                >
                    {selectedTag ? <MediaViewer media={selectedTag.media} /> : <ProjectPoster project={project} />}
                </motion.div>
            </AnimatePresence>
        </article>
    );
};

/* ─── Smooth card transition variants ─── */
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
        opacity: 0,
        scale: 0.96,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: 'spring', stiffness: 280, damping: 30 },
            opacity: { duration: 0.25 },
            scale: { duration: 0.3 }
        }
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
        opacity: 0,
        scale: 0.96,
        transition: {
            x: { type: 'spring', stiffness: 280, damping: 30 },
            opacity: { duration: 0.25 },
            scale: { duration: 0.3 }
        }
    })
};

const ProjectsView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const projectCount = projects.length;

    const moveProject = useCallback((dir) => {
        setDirection(dir);
        setActiveIndex((current) => {
            const next = current + dir;
            if (next < 0) return projects.length - 1;
            if (next >= projects.length) return 0;
            return next;
        });
    }, []);

    const selectProject = (index) => {
        if (index === activeIndex) return;
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const handleDragEnd = (_, info) => {
        const swipePower = Math.abs(info.offset.x) * info.velocity.x;
        if (swipePower < -5000 || info.offset.x < -80) moveProject(1);
        if (swipePower > 5000 || info.offset.x > 80) moveProject(-1);
    };

    /* ─── Keyboard navigation ─── */
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') moveProject(-1);
            if (e.key === 'ArrowRight') moveProject(1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [moveProject]);

    return (
        <section id="projects" data-testid="projects-section" className="relative min-h-screen overflow-hidden border-b border-[#e8d8c9]/8 bg-[#151515] px-5 py-16 sm:px-10 md:py-6 lg:pl-44 lg:pr-10">
            <ScrollReveal preset="fade-up" duration={0.8} threshold={0.1}>
                <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-[86rem] flex-col md:min-h-[calc(100vh-1.5rem)]">
                    {/* ─── Section heading ─── */}
                    <ScrollReveal preset="fade-left" delay={0.1} className="mb-4 pt-0 md:mb-5">
                        <h2 className="font-display text-3xl font-bold text-[#e8d8c9] lg:text-4xl">
                            Selected Work
                        </h2>
                        <p className="mt-2 hidden max-w-md text-sm text-[#e8d8c9]/50 md:block">
                            A curated selection of projects I've built — from full-stack apps to hardware prototypes.
                        </p>
                    </ScrollReveal>

                    {/* ─── Cards area ─── */}
                    <div className="relative flex flex-1 items-center">
                        {/* Card container */}
                        <div className="relative h-[42rem] w-full px-0 sm:px-6 md:h-[34rem] lg:px-8">
                            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.12}
                                    onDragEnd={handleDragEnd}
                                    className="absolute inset-x-0 top-0 mx-auto touch-pan-y px-0 sm:px-6 lg:px-8"
                                    style={{ zIndex: 10 }}
                                >
                                    <ProjectCard project={projects[activeIndex]} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ─── Arrow buttons — OUTSIDE card container, z-40 ─── */}
                        <button
                            type="button"
                            onClick={() => moveProject(-1)}
                            className="absolute left-2 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-[#e8d8c9]/18 bg-[#181818]/90 text-2xl text-[#e8d8c9]/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all hover:border-primary/55 hover:bg-[#181818] hover:text-white hover:shadow-[0_16px_48px_rgba(243,112,30,0.15)] active:scale-95 md:grid lg:left-0"
                            aria-label="Previous project"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => moveProject(1)}
                            className="absolute right-2 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-[#e8d8c9]/18 bg-[#181818]/90 text-2xl text-[#e8d8c9]/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all hover:border-primary/55 hover:bg-[#181818] hover:text-white hover:shadow-[0_16px_48px_rgba(243,112,30,0.15)] active:scale-95 md:grid lg:right-0"
                            aria-label="Next project"
                        >
                            ›
                        </button>

                        {/* ─── Dot indicators ─── */}
                        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:bottom-1">
                            {projects.map((project, index) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => selectProject(index)}
                                    className={`h-2.5 w-2.5 rounded-full border transition-colors ${index === activeIndex ? 'border-primary bg-primary shadow-[0_0_18px_rgba(243,112,30,0.55)]' : 'border-primary/24 bg-primary/10 hover:bg-primary/35'}`}
                                    aria-label={`Show ${project.title}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ProjectsView;
