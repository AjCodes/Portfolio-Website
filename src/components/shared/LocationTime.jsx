import { useState, useEffect } from 'react';

// Shows the current local time for Netherlands (Europe/Amsterdam timezone)
const LocationTime = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Europe/Amsterdam'
            };
            setTime(now.toLocaleTimeString('en-GB', options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-11 right-14 z-[70] flex pointer-events-none select-none items-center gap-2 font-mono text-xs max-sm:bottom-10 max-sm:right-7 max-sm:text-[10px]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="tracking-widest text-white/60">
                {time} <span className="max-sm:hidden">local time</span><span className="sm:hidden">local</span>
            </span>
        </div>
    );
};

export default LocationTime;
