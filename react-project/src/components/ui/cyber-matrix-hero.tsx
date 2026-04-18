"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';

// A utility function for class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// The main hero component
const CyberMatrixHero = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !gridRef.current) return;

        const grid = gridRef.current;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?;:"[]{}\\|!@#$%^&*()_+-=';
        let columns = 0;
        let rows = 0;
        
        const createTile = () => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            tile.onclick = (e: MouseEvent) => {
                const target = e.target as HTMLDivElement;
                target.textContent = chars[Math.floor(Math.random() * chars.length)];
                target.classList.add('glitch');
                setTimeout(() => target.classList.remove('glitch'), 200);
            };

            return tile;
        }

        const createTiles = (quantity: number) => {
            Array.from(Array(quantity)).map(() => {
                grid.appendChild(createTile());
            });
        }

        const createGrid = () => {
            grid.innerHTML = '';
            
            const size = 60;
            columns = Math.floor(window.innerWidth / size);
            rows = Math.floor(window.innerHeight / size);
            
            grid.style.setProperty('--columns', columns.toString());
            grid.style.setProperty('--rows', rows.toString());
            
            createTiles(columns * rows);

            for(const tile of Array.from(grid.children) as HTMLDivElement[]) {
                tile.textContent = chars[Math.floor(Math.random() * chars.length)];
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const radius = window.innerWidth / 4;

            for(const tile of Array.from(grid.children) as HTMLDivElement[]) {
                const rect = tile.getBoundingClientRect();
                const tileX = rect.left + rect.width / 2;
                const tileY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(mouseX - tileX, 2) + Math.pow(mouseY - tileY, 2)
                );

                const intensity = Math.max(0, 1 - distance / radius);
                
                tile.style.setProperty('--intensity', intensity.toString());
            }
        };

        window.addEventListener('resize', createGrid);
        window.addEventListener('mousemove', handleMouseMove);
        
        createGrid();

        return () => {
            window.removeEventListener('resize', createGrid);
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, [isClient]);

    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 0.5,
                duration: 0.8,
                ease: "easeInOut" as const,
            },
        }),
    };


    return (
        <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Animated Grid Background */}
            <div ref={gridRef} id="tiles" className="pointer-events-auto"></div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                #tiles {
                    --intensity: 0;
                    display: grid;
                    grid-template-columns: repeat(var(--columns), 1fr);
                    grid-template-rows: repeat(var(--rows), 1fr);
                    width: 100vw;
                    height: 100vh;
                    position: absolute;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                }
                .tile {
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 1.2rem;
                    pointer-events: auto;
                    
                    /* Use CSS variable for dynamic styling - Changed to Violet/Cyan */
                    opacity: calc(0.1 + var(--intensity) * 0.9);
                    color: hsl(260, 100%, calc(70% + var(--intensity) * 30%));
                    text-shadow: 0 0 calc(var(--intensity) * 15px) hsl(260, 100%, 65%);
                    transform: scale(calc(1 + var(--intensity) * 0.2));
                    transition: color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease;
                    user-select: none;
                }
                .tile.glitch {
                    animation: glitch-anim 0.2s ease;
                }
                @keyframes glitch-anim {
                    0% { transform: scale(1); color: #6C63FF; }
                    50% { transform: scale(1.2); color: #fff; text-shadow: 0 0 10px #fff; }
                    100% { transform: scale(1); color: #6C63FF; }
                }
            `}} />

            {/* Content removed as requested */}

        </div>
    );
};

export default CyberMatrixHero;
