import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../../shared/ScrollReveal';

const HomeView = ({ isReady = true }) => {
    const { scrollYProgress } = useScroll();
    const screenY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
    const screenScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);

    return (
        <section id="home" className="relative flex min-h-screen overflow-hidden border-b border-[#e8d8c9]/8">
            <div className="pointer-events-none absolute inset-0 bg-[#151515]" />

            <div className="relative z-10 grid w-full items-center gap-10 px-6 py-28 sm:px-10 lg:grid-cols-[0.52fr_0.48fr] lg:pl-48 lg:pr-16">
                {/* Hero text — staggered reveals */}
                <motion.div
                    initial={false}
                    animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ScrollReveal preset="fade-left" delay={0} duration={0.65}>
                        <p className="font-display text-2xl font-semibold text-[#dce5f2] sm:text-4xl">
                            Hey, I&apos;m AJ.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal preset="fade-up" delay={0.15} duration={0.7}>
                        <h1
                            className="mt-5 max-w-[48rem] font-display font-bold leading-[0.92] tracking-normal text-[#f0e6dc]"
                            style={{ fontSize: 'clamp(3.2rem, 6.2vw, 6.2rem)' }}
                        >
                            Building digital experiences people remember
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal preset="blur-in" delay={0.3} duration={0.75}>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#e8d8c9]/68 sm:text-lg">
                            Developer who crafts more than code
                        </p>
                    </ScrollReveal>

                    <ScrollReveal
                        preset="fade-up"
                        stagger={0.1}
                        delay={0.45}
                        className="mt-9 flex flex-wrap gap-3"
                    >
                        <a
                            href="#projects"
                            className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(243,112,30,0.24)] transition-transform hover:-translate-y-0.5"
                        >
                            View My Work
                        </a>
                        <a
                            href="#about"
                            className="rounded-full border border-[#e8d8c9]/18 bg-[#e8d8c9]/6 px-6 py-3 text-sm font-bold text-[#e8d8c9] transition-colors hover:border-[#4B607F]/70 hover:text-white"
                        >
                            About Me
                        </a>
                    </ScrollReveal>
                </motion.div>

                {/* Decorative screen — scroll parallax + mouse parallax */}
                <motion.div
                    className="relative hidden min-h-[34rem] lg:block"
                    style={{ y: screenY, scale: screenScale }}
                    initial={false}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.3, ease: 'linear' }}
                    aria-hidden="true"
                >
                    <div
                        className="absolute left-1/2 top-1/2 h-[28rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.4rem] border border-[#dce5f2]/16 bg-[#07101b]/76 shadow-[inset_0_0_70px_rgba(255,255,255,0.035),0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl"
                    >
                        <div className="absolute inset-5 rounded-[1.8rem] border border-[#dce5f2]/10 bg-[#0d1117]" />
                        <div className="absolute left-10 right-10 top-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8d8c9]/40">
                            <span>Design</span>
                            <span>Code</span>
                            <span>UX</span>
                        </div>
                        <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-[#4B607F]/45 bg-[#050505]/78 shadow-[0_0_80px_rgba(75,96,127,0.32)]">
                            <img src="/media/home/aj-logo.png" alt="AJCODEX logo" className="h-32 w-32 object-contain" />
                        </div>
                        <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 540 448">
                            <motion.path
                                d="M64 314 C116 198, 190 334, 254 252 S362 152, 474 230"
                                fill="none"
                                stroke="#4B607F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.35, ease: 'easeOut' }}
                            />
                            <motion.path
                                d="M95 242 C162 204, 224 224, 282 196 S404 132, 452 168"
                                fill="none"
                                stroke="#f3701e"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="3 12"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.55, ease: 'easeOut', delay: 0.08 }}
                            />
                            {[
                                [116, 250],
                                [254, 252],
                                [388, 174],
                                [452, 168]
                            ].map(([cx, cy]) => (
                                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#f3701e" opacity="0.72" />
                            ))}
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <ScrollReveal preset="fade-up" delay={1.0} duration={0.6}>
                <div className="pointer-events-none absolute bottom-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-65">
                    <div className="relative h-9 w-2 rounded-full border border-[#e8d8c9]/26 bg-[#e8d8c9]/8">
                        <motion.span
                            className="absolute top-1 h-1 w-1 rounded-full bg-primary"
                            style={{ left: '50%', marginLeft: '-2px' }}
                            animate={{ y: [0, 17, 0], opacity: [0.9, 0.25, 0.9] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#e8d8c9]/68">scroll</span>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default HomeView;
