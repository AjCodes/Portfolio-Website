import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindow } from '../../../context/WindowManagerContext';
import StartMenu from './StartMenu';

const Taskbar = () => {
    const { windows, activeWindowId, minimizeWindow, focusWindow } = useWindow();
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

            <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/80 backdrop-blur-md border-t border-gray-700 flex items-center px-4 z-50 justify-between">
                <div className="flex items-center gap-4">
                    {/* Start Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsStartOpen(!isStartOpen)}
                        className={`
              w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 transition-all
              ${isStartOpen ? 'ring-2 ring-white/50' : ''}
            `}
                    >
                        AJ
                    </motion.button>

                    {/* Open Windows */}
                    <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
                        {windows.map((window) => (
                            <motion.button
                                key={window.id}
                                onClick={() => window.id === activeWindowId ? minimizeWindow(window.id) : focusWindow(window.id)}
                                className={`
                  px-4 py-1.5 rounded-md flex items-center gap-2 transition-all
                  ${activeWindowId === window.id
                                        ? 'bg-gray-700 text-white shadow-inner'
                                        : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'}
                `}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                <span>{window.icon}</span>
                                <span className="text-sm hidden md:inline">{window.title}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* System Tray */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2 px-3 py-1 hover:bg-gray-800 rounded transition-colors cursor-default">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>Online</span>
                    </div>
                    <div className="px-3 py-1 hover:bg-gray-800 rounded transition-colors cursor-default">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Taskbar;

