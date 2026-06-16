import { motion, useScroll, useTransform } from 'framer-motion';

const HomeView = () => {
    const { scrollYProgress } = useScroll();
    const screenY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
    const screenScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);

    return (
        <section id="home" className="relative flex min-h-screen overflow-hidden border-b border-[#e8d8c9]/8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,rgba(75,96,127,0.34),transparent_32%),radial-gradient(circle_at_32%_56%,rgba(243,112,30,0.16),transparent_24%),#181818]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(232,216,201,0.035)_1px,transparent_1px),linear-gradient(rgba(232,216,201,0.025)_1px,transparent_1px)] bg-[size:88px_88px] opacity-30" />

            <div className="relative z-10 grid w-full items-center gap-10 px-6 py-28 sm:px-10 lg:grid-cols-[0.52fr_0.48fr] lg:pl-48 lg:pr-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <p className="font-display text-2xl font-semibold text-white sm:text-4xl">
                        Hey, I&apos;m AJ.
                    </p>
                    <h1
                        className="mt-5 max-w-[48rem] font-display font-bold leading-[0.92] tracking-normal text-[#e8d8c9]"
                        style={{ fontSize: 'clamp(3.2rem, 6.2vw, 6.2rem)' }}
                    >
                        Building digital experiences people remember
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-[#e8d8c9]/68 sm:text-lg">
                        Developer who crafts more than code
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <a href="#projects" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(243,112,30,0.24)] transition-transform hover:-translate-y-0.5">
                            View My Work
                        </a>
                        <a href="#about" className="rounded-full border border-[#e8d8c9]/18 bg-[#e8d8c9]/6 px-6 py-3 text-sm font-bold text-[#e8d8c9] transition-colors hover:border-primary/55 hover:text-white">
                            About Me
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="relative hidden min-h-[34rem] lg:block"
                    style={{ y: screenY, scale: screenScale }}
                    initial={{ opacity: 0, rotateX: 8 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    aria-hidden="true"
                >
                    <div className="absolute left-1/2 top-1/2 h-[28rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.4rem] border border-[#e8d8c9]/12 bg-[#07101b]/72 shadow-[inset_0_0_70px_rgba(255,255,255,0.035),0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                        <div className="absolute inset-5 rounded-[1.8rem] border border-[#e8d8c9]/8 bg-[radial-gradient(circle_at_50%_55%,rgba(75,96,127,0.38),transparent_40%),#0d1117]" />
                        <div className="absolute left-10 right-10 top-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8d8c9]/40">
                            <span>Design</span>
                            <span>Code</span>
                            <span>UX</span>
                        </div>
                        <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-primary/25 bg-[#050505]/72 shadow-[0_0_80px_rgba(243,112,30,0.22)]">
                            <img src="/media/home/aj-logo.png" alt="AJCODEX logo" className="w-32" />
                        </div>
                        <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 540 448">
                            <motion.path
                                d="M64 312 C118 164, 242 362, 312 168 S430 144, 482 274"
                                fill="none"
                                stroke="#f3701e"
                                strokeWidth="2"
                                strokeDasharray="10 14"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>

            <div className="pointer-events-none absolute bottom-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-65">
                <div className="relative h-9 w-2 rounded-full border border-[#e8d8c9]/26 bg-[#e8d8c9]/8">
                    <motion.span
                        className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
                        animate={{ y: [0, 17, 0], opacity: [0.9, 0.25, 0.9] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#e8d8c9]/68">scroll</span>
            </div>
        </section>
    );
};

export default HomeView;
