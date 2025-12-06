import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const canvasRef = useRef(null);
    const pointsRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new point
            pointsRef.current.push({
                x: mouseRef.current.x,
                y: mouseRef.current.y,
                age: 0
            });

            // Limit points and remove old ones
            if (pointsRef.current.length > 40) {
                pointsRef.current.shift();
            }

            // Draw trail
            if (pointsRef.current.length > 2) {
                ctx.beginPath();
                ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

                for (let i = 1; i < pointsRef.current.length - 1; i++) {
                    const xc = (pointsRef.current[i].x + pointsRef.current[i + 1].x) / 2;
                    const yc = (pointsRef.current[i].y + pointsRef.current[i + 1].y) / 2;
                    ctx.quadraticCurveTo(pointsRef.current[i].x, pointsRef.current[i].y, xc, yc);

                    // Update age
                    pointsRef.current[i].age++;
                }

                // Draw the last segment
                const last = pointsRef.current[pointsRef.current.length - 1];
                ctx.lineTo(last.x, last.y);

                // Style
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // Create gradient for trail
                const gradient = ctx.createLinearGradient(
                    pointsRef.current[0].x, pointsRef.current[0].y,
                    last.x, last.y
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)'); // White trail

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ mixBlendMode: 'difference' }}
        />
    );
};

export default CustomCursor;
