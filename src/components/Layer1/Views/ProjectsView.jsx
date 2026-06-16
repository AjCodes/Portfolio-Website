import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../../data/projects';

const ProjectPoster = ({ project }) => {
    if (project.id === 'smart-roads') {
        return (
        <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#11161d]">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(75,96,127,0.28),transparent_45%),radial-gradient(circle_at_78%_18%,rgba(243,112,30,0.22),transparent_24%)]" />
                <div className="absolute bottom-8 left-8 right-8 top-8 rounded-[1.2rem] border border-[#e8d8c9]/10 bg-black/22" />
                <div className="absolute left-[12%] top-[18%] h-[68%] w-px bg-[#e8d8c9]/18" />
                <div className="absolute left-[42%] top-[12%] h-[76%] w-px bg-[#e8d8c9]/18" />
                <div className="absolute left-[8%] right-[10%] top-[48%] h-px bg-[#e8d8c9]/18" />
                <div className="absolute left-[8%] right-[10%] top-[72%] h-px bg-[#e8d8c9]/18" />
                {[['18%', '45%', '#ef4444'], ['24%', '45%', '#facc15'], ['30%', '45%', '#22c55e'], ['55%', '68%', '#22c55e'], ['61%', '68%', '#facc15'], ['67%', '68%', '#ef4444']].map(([left, top, color]) => (
                    <span key={`${left}-${top}`} className="absolute h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]" style={{ left, top, color, backgroundColor: color }} />
                ))}
                <div className="absolute right-10 top-10 w-48 rounded-2xl border border-[#4b607f]/45 bg-[#181818]/78 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8d8c9]/48">live data</p>
                    <div className="mt-4 space-y-2">
                        <span className="block h-2 w-4/5 rounded-full bg-[#4b607f]" />
                        <span className="block h-2 w-3/5 rounded-full bg-primary/70" />
                        <span className="block h-2 w-11/12 rounded-full bg-[#e8d8c9]/20" />
                    </div>
                </div>
                <div className="absolute bottom-10 left-10">
                    <p className="font-display text-4xl font-bold text-[#e8d8c9]">Smart Roads</p>
                    <p className="mt-2 max-w-xs text-sm text-[#e8d8c9]/58">Prototype, sensors, traffic logic, and backend signals in one system.</p>
                </div>
            </div>
        );
    }

    if (project.id === 'focusup') {
        return (
            <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#121212]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(243,112,30,0.26),transparent_26%),linear-gradient(135deg,rgba(75,96,127,0.2),transparent_55%)]" />
                <div className="absolute left-1/2 top-1/2 h-[25rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.2rem] border border-[#e8d8c9]/18 bg-[#181818] p-4 shadow-[0_26px_90px_rgba(0,0,0,0.48)]">
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
                <div className="absolute bottom-10 left-10">
                    <p className="font-display text-4xl font-bold text-[#e8d8c9]">FocusUp</p>
                    <p className="mt-2 max-w-xs text-sm text-[#e8d8c9]/58">A productivity app shaped around momentum, habits, and small wins.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#141313]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_26%,rgba(243,112,30,0.24),transparent_25%),linear-gradient(135deg,rgba(75,96,127,0.24),transparent_58%)]" />
            <div className="absolute left-12 top-12 grid h-64 w-64 place-items-center rounded-full border border-primary/18 bg-[#e8d8c9]/5">
                <img src="/media/projects/cardan-logo.png" alt="" className="w-44 rounded-xl bg-white/92 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)]" />
            </div>
            <div className="absolute right-10 top-10 rounded-2xl border border-[#e8d8c9]/10 bg-[#181818]/74 p-4 backdrop-blur-xl">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">motor symptom lens</p>
                <div className="mt-5 flex h-28 w-44 items-center justify-center">
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
            <div className="absolute bottom-12 left-12 h-36 w-52 rounded-[2rem] border border-[#e8d8c9]/14 bg-[#e8d8c9]/7 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <div className="flex gap-2">
                    {[0, 1, 2, 3].map((item) => (
                        <span key={item} className="h-12 w-7 rounded-full border border-primary/30 bg-primary/10" />
                    ))}
                </div>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#e8d8c9]/48">interactive empathy</p>
            </div>
            <div className="absolute bottom-10 right-10 max-w-xs text-right">
                <p className="font-display text-4xl font-bold text-[#e8d8c9]">Cardan Accessibility Project</p>
                <p className="mt-2 text-sm text-[#e8d8c9]/58">An accessibility experience designed around interaction, awareness, and empathy.</p>
            </div>
        </div>
    );
};

const MediaViewer = ({ media }) => (
    <div className="grid h-full min-h-[18rem] gap-3 overflow-hidden rounded-[1.5rem] border border-[#e8d8c9]/12 bg-black/72 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
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
                        <img src={item.src} alt={item.label} className="h-[15rem] w-full object-contain" loading="lazy" />
                    ) : (
                        <video
                            key={item.src}
                            src={item.src}
                            className="h-[15rem] w-full bg-black object-contain"
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
        <article className="grid min-h-[25rem] w-full grid-cols-1 gap-4 rounded-[1.75rem] border border-[#e8d8c9]/10 bg-[#181818]/74 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[0.39fr_0.61fr] lg:p-5">
            <div className="flex flex-col justify-between p-1 lg:p-3">
                <div>
                    <p className="font-mono text-5xl font-bold leading-none text-primary/20">{project.number}</p>
                    <div className="mt-2 inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        {project.type}
                    </div>
                    <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-[#e8d8c9] lg:text-4xl">
                        {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#e8d8c9]/66">{project.description}</p>
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
                    className="min-h-[18rem]"
                >
                    {selectedTag ? <MediaViewer media={selectedTag.media} /> : <ProjectPoster project={project} />}
                </motion.div>
            </AnimatePresence>
        </article>
    );
};

const ProjectsView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = projects[activeIndex];

    const moveProject = (direction) => {
        setActiveIndex((current) => {
            const next = current + direction;
            if (next < 0) return projects.length - 1;
            if (next >= projects.length) return 0;
            return next;
        });
    };

    return (
        <section id="projects" className="relative min-h-screen overflow-hidden border-b border-[#e8d8c9]/8 bg-[#181818] px-6 py-14 sm:px-10 lg:pl-44 lg:pr-10">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(232,216,201,0.04)_1px,transparent_1px),linear-gradient(rgba(232,216,201,0.028)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center">
                <div className="w-full overflow-hidden px-0 sm:px-8 lg:px-14">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, x: 42, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -42, scale: 0.98 }}
                            transition={{ duration: 0.34, ease: 'easeOut' }}
                        >
                            <ProjectCard project={activeProject} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    type="button"
                    onClick={() => moveProject(-1)}
                    className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[#e8d8c9]/14 bg-[#181818]/82 text-2xl text-[#e8d8c9]/72 shadow-[0_16px_40px_rgba(0,0,0,0.34)] transition-colors hover:border-primary/45 hover:text-white sm:grid"
                    aria-label="Previous project"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => moveProject(1)}
                    className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[#e8d8c9]/14 bg-[#181818]/82 text-2xl text-[#e8d8c9]/72 shadow-[0_16px_40px_rgba(0,0,0,0.34)] transition-colors hover:border-primary/45 hover:text-white sm:grid"
                    aria-label="Next project"
                >
                    ›
                </button>

                <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-1">
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-9 bg-primary' : 'w-2 bg-[#e8d8c9]/24 hover:bg-[#e8d8c9]/45'}`}
                            aria-label={`Show ${project.title}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsView;
