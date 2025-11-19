import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

const SeamlessBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: -1000, y: -1000 };

        // Theme Colors - responsive to theme
        const isDark = theme === 'dark';
        const bgColor = isDark ? 'hsl(240, 15%, 8%)' : 'hsl(0, 0%, 98%)';
        const particleColor = isDark 
            ? 'rgba(100, 200, 255, 0.5)' // Bright cyan for dark
            : 'rgba(255, 100, 50, 0.6)'; // Orange for light
        const connectionColor = isDark 
            ? 'rgba(255, 255, 255, 0.12)' 
            : 'rgba(0, 0, 0, 0.08)';

        // Configuration - modern particle system
        const particleCount = 120;
        const connectionDistance = 140;
        const mouseRadius = 180;
        const repulsionForce = 0.6;

        // Initialize particles
        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];

            // Create particles with better distribution
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    baseX: Math.random() * canvas.width,
                    baseY: Math.random() * canvas.height,
                    fontSize: Math.random() * 3 + 5, // 5-8px font size for "AJ"
                    opacity: Math.random() * 0.3 + 0.15,
                    pulse: Math.random() * Math.PI * 2,
                });
            }
        };

        // Draw particle with "AJ" text (small, like dots)
        const drawParticle = (x, y, opacity, fontSize) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = particleColor;
            ctx.font = `600 ${fontSize.toFixed(1)}px 'Inter', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('AJ', x, y);
            ctx.restore();
        };

        const draw = () => {
            // Clear with theme background
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((p, i) => {
                // Mouse interaction - repel particles
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius && distance > 0) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    const pushX = Math.cos(angle) * force * repulsionForce;
                    const pushY = Math.sin(angle) * force * repulsionForce;

                    p.vx -= pushX;
                    p.vy -= pushY;
                }

                // Spring back to base position
                const springX = (p.baseX - p.x) * 0.008;
                const springY = (p.baseY - p.y) * 0.008;
                p.vx += springX;
                p.vy += springY;

                // Apply velocity with damping
                p.vx *= 0.96;
                p.vy *= 0.96;
                p.x += p.vx;
                p.y += p.vy;

                // Keep particles within bounds with soft bounce
                if (p.x < 0 || p.x > canvas.width) {
                    p.vx *= -0.7;
                    p.x = Math.max(0, Math.min(canvas.width, p.x));
                }
                if (p.y < 0 || p.y > canvas.height) {
                    p.vy *= -0.7;
                    p.y = Math.max(0, Math.min(canvas.height, p.y));
                }

                // Pulse animation
                p.pulse += 0.02;
                const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.05;

                // Draw "AJ" particle
                drawParticle(p.x, p.y, pulseOpacity, p.fontSize);
            });

            // Draw connections between nearby particles
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - (distance / connectionDistance)) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = isDark 
                            ? `rgba(255, 255, 255, ${opacity})`
                            : `rgba(0, 0, 0, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles.forEach(p => {
                p.baseX = Math.random() * canvas.width;
                p.baseY = Math.random() * canvas.height;
            });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        init();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none transition-colors duration-300"
        />
    );
};

export default SeamlessBackground;
