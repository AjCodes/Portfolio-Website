import { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

export const useWindow = () => useContext(WindowContext);

export const WindowManagerProvider = ({ children }) => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [minimizedWindows, setMinimizedWindows] = useState([]);

    const openWindow = (id, title, component, icon) => {
        if (windows.find((w) => w.id === id)) {
            setActiveWindowId(id);
            if (minimizedWindows.includes(id)) {
                setMinimizedWindows(minimizedWindows.filter((wId) => wId !== id));
            }
            return;
        }

        const newWindow = {
            id,
            title,
            component,
            icon,
            zIndex: 100 + windows.length,
        };

        setWindows([...windows, newWindow]);
        setActiveWindowId(id);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter((w) => w.id !== id));
        setMinimizedWindows(minimizedWindows.filter((wId) => wId !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id) => {
        if (minimizedWindows.includes(id)) {
            setMinimizedWindows(minimizedWindows.filter((wId) => wId !== id));
            setActiveWindowId(id);
        } else {
            setMinimizedWindows([...minimizedWindows, id]);
            setActiveWindowId(null);
        }
    };

    const focusWindow = (id) => {
        setActiveWindowId(id);
        // Bring to front logic - ensure windows stay above z-100
        const maxZ = Math.max(...windows.map((w) => w.zIndex), 99);
        setWindows(
            windows.map((w) =>
                w.id === id ? { ...w, zIndex: maxZ + 1 } : w
            )
        );
    };

    return (
        <WindowContext.Provider
            value={{
                windows,
                activeWindowId,
                minimizedWindows,
                openWindow,
                closeWindow,
                minimizeWindow,
                focusWindow,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};
