import React, { useEffect, useRef, useState, useMemo } from 'react';
/* 
  We use D3 for the map projection and calculations, 
  but render using HTML5 Canvas for performance (lots of dots).
*/
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';

const DotMap = ({ locations = [], activeLocationId, onLocationHover }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    // Process map data once
    const countries = useMemo(() => {
        return feature(worldAtlas, worldAtlas.objects.countries).features;
    }, []);

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [hoveredLocation, setHoveredLocation] = useState(null);

    // Mouse interaction handler
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const { width, height } = dimensions;

            // Re-create projection to match render (optimize by moving projection to state/ref?)
            // Ideally we memoize projection but for now we recreate to ensure sync
            const projection = d3.geoEquirectangular()
                .fitSize([width, height], { type: 'Sphere' })
                .rotate([-20, -10, 0])
                .scale(width / 6.2)
                .translate([width / 2, height / 1.8]);

            let found = null;

            // Check distance to each location
            for (const loc of locations) {
                const parseCoord = (str) => {
                    const parts = str.split('/');
                    const latPart = parts[0].trim();
                    const lonPart = parts[1].trim();
                    const lat = parseFloat(latPart) * (latPart.includes('S') ? -1 : 1);
                    const lon = parseFloat(lonPart) * (lonPart.includes('W') ? -1 : 1);
                    return [lon, lat];
                };

                const pos = projection(parseCoord(loc.coordinates));
                if (pos) {
                    const [px, py] = pos;
                    const dx = x - px;
                    const dy = y - py;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 20) { // Hit radius
                        found = loc.id;
                        break;
                    }
                }
            }

            setHoveredLocation(found);
            if (onLocationHover) {
                onLocationHover(found);
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        return () => canvas.removeEventListener('mousemove', handleMouseMove);
    }, [dimensions, locations, onLocationHover]);

    // Draw Map
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const { width, height } = dimensions;

        // Retina display support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Update cursor style
        canvas.style.cursor = hoveredLocation ? 'pointer' : 'default';

        // Projection setup
        // Rotate to center on roughly the Middle East/Asia as derived from user pref
        const projection = d3.geoEquirectangular()
            .fitSize([width, height], { type: 'Sphere' })
            .rotate([-20, -10, 0]) // Adjust rotation to center map
            .scale(width / 6.2) // Adjust scale manually for zoom
            .translate([width / 2, height / 1.8]);

        const pathGenerator = d3.geoPath().projection(projection);

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // 1. Generate grid of points
        // We scan the screen space and check if a point is inside a country
        const spacing = 6; // Space between dots
        const rows = Math.ceil(height / spacing);
        const cols = Math.ceil(width / spacing);

        ctx.fillStyle = '#333'; // Inactive dot color

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const px = x * spacing;
                const py = y * spacing;

                // Inverse project to get Lat/Lon
                const [lon, lat] = projection.invert([px, py]);

                // Simple bounding box check first for perf, then precise check?
                // Actually standard way is to check if point is in land.
                // Doing point-in-polygon for thousands of points is heavy.
                // Optimization: Pre-render land to an offscreen canvas and sample pixel data.
            }
        }

        /* 
           OPTIMIZED APPROACH:
           1. Draw land masses to an offscreen canvas.
           2. Scan pixel data of offscreen canvas.
           3. If pixel is filled, draw a dot on the main canvas.
        */
        const offscreen = document.createElement('canvas');
        offscreen.width = Math.floor(width / spacing);
        offscreen.height = Math.floor(height / spacing);
        const offCtx = offscreen.getContext('2d');

        // Scale projection to match the small offscreen grid
        const smallProjection = d3.geoEquirectangular()
            .fitSize([offscreen.width, offscreen.height], { type: 'Sphere' })
            .rotate([-20, -10, 0])
            .scale(offscreen.width / 6.2)
            .translate([offscreen.width / 2, offscreen.height / 1.8]);

        const smallPath = d3.geoPath().projection(smallProjection);

        offCtx.fillStyle = 'black';
        offCtx.fillRect(0, 0, offscreen.width, offscreen.height);

        offCtx.fillStyle = 'white';
        // Render all countries
        countries.forEach(feature => {
            offCtx.beginPath();
            smallPath(feature);
            offCtx.fill();
        });

        // Read pixel data
        const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height).data;

        // Draw dots based on pixel data
        for (let y = 0; y < offscreen.height; y++) {
            for (let x = 0; x < offscreen.width; x++) {
                const index = (y * offscreen.width + x) * 4;
                const isLand = imageData[index] > 100; // Check red channel

                if (isLand) {
                    const posX = x * spacing + spacing / 2;
                    const posY = y * spacing + spacing / 2;

                    ctx.beginPath();
                    ctx.arc(posX, posY, 1, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; // Dim dot
                    ctx.fill();
                }
            }
        }

        // 2. Draw Connection Lines (Curves)
        if (locations.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(100, 255, 218, 0.3)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]); // Dashed line

            // We need to order locations: Yemen -> Malaysia -> Netherlands
            // Finding them by ID
            const yemen = locations.find(l => l.id === 'yemen');
            const malaysia = locations.find(l => l.id === 'malaysia');
            const netherlands = locations.find(l => l.id === 'netherlands');

            const ordered = [yemen, malaysia, netherlands].filter(Boolean);

            ordered.forEach((loc, i) => {
                if (i === 0) return;
                const prev = ordered[i - 1];

                // Parse coordinates string '15.3°N / 44.2°E' -> [Lon, Lat]
                // Or just keep the logic simple if we assume format is standard
                // Helper to parse: 
                const parseCoord = (str) => {
                    // Split '15.3°N / 44.2°E'
                    const parts = str.split('/');
                    const latPart = parts[0].trim();
                    const lonPart = parts[1].trim();

                    const lat = parseFloat(latPart) * (latPart.includes('S') ? -1 : 1);
                    const lon = parseFloat(lonPart) * (lonPart.includes('W') ? -1 : 1);
                    return [lon, lat];
                };

                const p1 = projection(parseCoord(prev.coordinates));
                const p2 = projection(parseCoord(loc.coordinates));

                if (p1 && p2) {
                    // Draw quadratic bezier for curve
                    // Control point: mid point raised vertically (or projected mid)
                    // For 2D map simplified:
                    const midX = (p1[0] + p2[0]) / 2;
                    const midY = (p1[1] + p2[1]) / 2 - 50; // Curve up

                    ctx.moveTo(p1[0], p1[1]);
                    ctx.quadraticCurveTo(midX, midY, p2[0], p2[1]);
                }
            });
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // 3. Draw Locations Points
        locations.forEach(loc => {
            const parseCoord = (str) => {
                const parts = str.split('/');
                const latPart = parts[0].trim();
                const lonPart = parts[1].trim();
                const lat = parseFloat(latPart) * (latPart.includes('S') ? -1 : 1);
                const lon = parseFloat(lonPart) * (lonPart.includes('W') ? -1 : 1);
                return [lon, lat];
            };
            const pos = projection(parseCoord(loc.coordinates));

            if (pos) {
                const [x, y] = pos;

                // Outer Glow
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fillStyle = loc.id === activeLocationId ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.1)';
                ctx.fill();

                // Inner Dot
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, 2 * Math.PI);
                ctx.fillStyle = loc.id === activeLocationId ? '#22c55e' : 'white';
                ctx.fill();

                // Text Label
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.font = '10px monospace';
                ctx.fillText(loc.name, x + 10, y + 3);
            }
        });

    }, [dimensions, countries, locations, activeLocationId]);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px]">
            <canvas ref={canvasRef} className="w-full h-full" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default DotMap;
