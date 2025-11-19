import { motion, useDragControls } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useWindow } from '../../../context/WindowManagerContext';

const Window = ({ id, title, children, icon, zIndex }) => {
    const { closeWindow, minimizeWindow, focusWindow, activeWindowId } = useWindow();
    const [isMaximized, setIsMaximized] = useState(false);
    const constraintsRef = useRef(null);
    const dragControls = useDragControls();

    const isActive = activeWindowId === id;

    return (
        <motion.div
            drag={!isMaximized}
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                width: isMaximized ? '100vw' : '800px',
                height: isMaximized ? 'calc(100vh - 48px)' : '600px',
                x: isMaximized ? 0 : undefined,
                y: isMaximized ? 0 : undefined,
                left: isMaximized ? 0 : undefined,
                top: isMaximized ? 0 : undefined,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
                zIndex,
                position: isMaximized ? 'fixed' : 'absolute',
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
          h-10 px-4 flex items-center justify-between select-none
          ${isActive ? 'bg-gray-800' : 'bg-gray-900'}
          border-b border-gray-700
        `}
                onPointerDown={(e) => {
                    dragControls.start(e);
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
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
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
