import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WavePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = useRef(null);

    // User provided track in public folder
    const audioSrc = "/interstellar.mp3";

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Auto-loop
        if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
        }
    }, []);

    return (
        <>
            <audio ref={audioRef} src={audioSrc} />

            <motion.div
                className="fixed top-6 right-6 z-50 flex items-center justify-end cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={togglePlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div
                    className={`
                        relative flex items-center justify-center rounded-full 
                        transition-all duration-500 ease-out shadow-lg
                        ${isPlaying ? 'bg-black/40 backdrop-blur-xl w-36 border-primary/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'w-12 h-12 bg-white/5 hover:bg-white/10 hover:backdrop-blur-md border-white/10 hover:border-white/30'} 
                        h-12 overflow-hidden border
                    `}
                >
                    {/* The Wave Animation (Visible when playing) */}
                    <AnimatePresence>
                        {isPlaying && (
                            <motion.div
                                className="absolute left-4 flex items-center gap-[3px]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-[3px] bg-primary rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                        animate={{
                                            height: [6, 18, 6],
                                            opacity: [0.6, 1, 0.6]
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.15
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The "-" Symbol (Initial State) */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                        <span className={`text-white text-3xl font-light pb-1 transition-transform duration-300 ${isHovered ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}>–</span>
                    </div>

                    {/* Play Button Icon (Hover State) */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${!isPlaying && isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>

                    {/* Playing Text & Equalizer (Expanded State) */}
                    {isPlaying && (
                        <div className="flex items-center justify-between w-full pl-12 pr-4">
                            <span className="text-white/90 text-[10px] font-bold uppercase tracking-widest animate-pulse">Now Playing</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default WavePlayer;
