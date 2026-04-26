/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: '#0B1F3A',
                    forest: '#0B2E26',
                    gold: '#D4AF37',
                    ivory: '#F5F1E6',
                    'gold-muted': 'rgba(212, 175, 55, 0.4)',
                    'gold-light': 'rgba(212, 175, 55, 0.1)',
                },
                midnight: {
                    950: '#071221',
                    900: '#0B1F3A',
                    800: '#152C4E',
                },
                accent: {
                    DEFAULT: '#D4AF37',
                    hover: '#C29B2E',
                    glow: 'rgba(212, 175, 55, 0.5)',
                }
            },
            backgroundImage: {
                'spiritual-gradient': 'linear-gradient(135deg, #0B1F3A 0%, #0B2E26 100%)',
                'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
                'glass-card': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'serif'],
                display: ['Cormorant Garamond', 'serif'],
                heading: ['Cormorant Garamond', 'serif'],
                body: ['Plus Jakarta Sans', 'sans-serif'],
                sans: ['Plus Jakarta Sans', 'sans-serif'],
            },
            boxShadow: {
                'gold-glow': '0 0 20px rgba(212, 175, 55, 0.2)',
                'gold-glow-strong': '0 0 30px rgba(212, 175, 55, 0.4)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            backdropBlur: {
                xs: '2px',
                '3xl': '48px',
            },
            animation: {
                'breathe': 'breathe 4s ease-in-out infinite',
                'float': 'float 7s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
            }
        },
    },
    plugins: [],
};
