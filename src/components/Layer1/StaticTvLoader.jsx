import { motion } from 'framer-motion';

const bootTicks = Array.from({ length: 18 }, (_, index) => index);

const StaticTvLoader = () => {
    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-[90] bg-[#020202] p-5 md:p-8"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
                opacity: 0,
                scale: 0.27,
                x: '13.5vw',
                y: '-0.8vh',
                filter: 'blur(5px)',
                transition: {
                    duration: 1.18,
                    ease: [0.76, 0, 0.24, 1],
                    opacity: { duration: 0.18, delay: 0.94, ease: 'linear' },
                    filter: { duration: 0.22, delay: 0.9, ease: 'linear' }
                }
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            style={{ transformOrigin: '70% 48%' }}
        >
            <div className="relative h-full overflow-hidden rounded-[2.4rem] border border-[#d7c8b8]/24 bg-[#050505] shadow-[inset_0_0_150px_rgba(0,0,0,0.95),0_0_0_8px_rgba(0,0,0,0.72)]">
                <div className="boot-blue-screen absolute inset-[3.2%] overflow-hidden rounded-[7%/11%] border border-[#090b2c]/80 bg-[#25298f] shadow-[inset_0_0_90px_rgba(0,0,0,0.42),inset_0_0_12px_rgba(255,255,255,0.12)]">
                    <div className="boot-static absolute inset-0 opacity-30" />
                    <div className="boot-crt-lines absolute inset-0" />
                    <div className="boot-corner-shadow absolute inset-0" />
                </div>

                <motion.div
                    className="absolute left-[3.2%] right-[3.2%] top-1/2 flex -translate-y-1/2 flex-col items-center text-center"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="boot-title w-full text-center font-mono text-[clamp(3.1rem,8.6vw,8rem)] font-black uppercase leading-none tracking-[0.01em] text-[#fff5d6]">
                        AJCODEX
                    </div>
                    <div className="mt-6 font-mono text-[clamp(0.7rem,1.4vw,1.15rem)] font-bold uppercase leading-relaxed tracking-[0.18em] text-[#fff0b8]/86">
                        Portfolio Website
                    </div>

                    <div className="mt-14 w-full max-w-xl border-2 border-[#fff5d6]/82 bg-[#15185e]/40 p-1.5 shadow-[0_0_20px_rgba(255,245,214,0.16)]">
                        <div className="grid grid-cols-18 gap-1">
                            {bootTicks.map((tick) => (
                                <motion.span
                                    key={tick}
                                    className="h-7 bg-[#fff5d6]/16"
                                    animate={{ backgroundColor: 'rgba(255,245,214,0.9)' }}
                                    transition={{
                                        duration: 0.12,
                                        delay: 0.4 + tick * 0.04,
                                        ease: 'linear'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default StaticTvLoader;
