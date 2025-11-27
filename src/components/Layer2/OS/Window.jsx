import { motion, useDragControls } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useWindow } from '../../../context/WindowManagerContext';

const Window = ({ id, title, children, icon, zIndex }) => {
    const { closeWindow, minimizeWindow, focusWindow, activeWindowId } = useWindow();
    const [isMaximized, setIsMaximized] = useState(false);
    const constraintsRef = useRef(null);
    const dragControls = useDragControls();
    const windowRef = useRef(null);

    const isActive = activeWindowId === id;

    // Keyboard accessibility
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isActive) return;

            if (e.key === 'Escape') {
                closeWindow(id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, id, closeWindow]);

    // Calculate centered position
    const windowWidth = 800;
    const windowHeight = 600;
    const centerX = typeof window !== 'undefined' ? (window.innerWidth - windowWidth) / 2 : 100;
    const centerY = typeof window !== 'undefined' ? (window.innerHeight - windowHeight) / 2 : 100;

    // Add slight random offset to prevent windows from stacking exactly on top of each other
    const randomOffset = Math.random() * 20;

    return (
        <motion.div
            ref={windowRef}
            role="dialog"
            aria-label={title}
            aria-modal="true"
            tabIndex={-1}
            drag={!isMaximized}
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{
                left: -centerX + 50,
                right: typeof window !== 'undefined' ? window.innerWidth - centerX - windowWidth - 50 : 0,
                top: -centerY + 50,
                bottom: typeof window !== 'undefined' ? window.innerHeight - centerY - windowHeight - 50 : 0
            }}
            initial={{
                scale: 0.8,
                opacity: 0,
                x: centerX + randomOffset,
                y: centerY + randomOffset
            }}
            animate={{
                scale: 1,
                opacity: 1,
                x: isMaximized ? 0 : centerX + randomOffset,
                y: isMaximized ? 0 : centerY + randomOffset,
                width: isMaximized ? '100vw' : windowWidth,
                height: isMaximized ? '100vh' : windowHeight
            }}
            style={{
                zIndex,
                position: 'fixed',
                top: 0,
                left: 0
            }}
            className={`
        ${isMaximized ? 'rounded-none' : 'rounded-lg'}
        overflow-hidden shadow-2xl border border-gray-700 bg-gray-900/95 backdrop-blur-md
        flex flex-col
      `}
            onPointerDown={() => focusWindow(id)}
        >
            {/* Title Bar */}
            <div
                className={`
          h-10 px-4 flex items-center justify-between select-none cursor-move
          ${isActive ? 'bg-gray-800' : 'bg-gray-900'}
          border-b border-gray-700
        `}
                onPointerDown={(e) => {
                    if (!isMaximized) {
                        dragControls.start(e);
                    }
                    focusWindow(id);
                }}
                onDoubleClick={() => setIsMaximized(!isMaximized)}
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium text-gray-300">{title}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                        aria-label="Minimize window"
                        title="Minimize"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
                        aria-label={isMaximized ? "Restore window" : "Maximize window"}
                        title={isMaximized ? "Restore" : "Maximize"}
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                        aria-label="Close window"
                        title="Close"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 custom-scrollbar relative">
                {children}
            </div>
        </motion.div>
    );
};

export default Window;
