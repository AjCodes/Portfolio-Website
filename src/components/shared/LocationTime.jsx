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
        <div className="fixed bottom-6 right-6 z-50 font-mono text-xs pointer-events-none select-none">
            <span className="text-white/60 tracking-widest">{time} local time</span>
        </div>
    );
};

export default LocationTime;
