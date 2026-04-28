/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    black: 'var(--bg-main)',
                    gold: 'var(--brand-gold)',
                    'gold-light': 'var(--brand-gold-light)',
                    white: 'var(--text-primary)',
                    gray: 'var(--text-secondary)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Geist', 'Satoshi', 'sans-serif'],
                heading: ['Inter', 'Geist', 'Satoshi', 'sans-serif'],
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5D76E 100%)',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
        },
    },
    plugins: [],
};
