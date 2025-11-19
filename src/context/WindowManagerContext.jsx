import { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

export const useWindow = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
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
            zIndex: windows.length + 1,
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
        // Bring to front logic could be added here by updating zIndex
        const maxZ = Math.max(...windows.map((w) => w.zIndex), 0);
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
