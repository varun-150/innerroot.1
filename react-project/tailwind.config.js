/** @type {import('tailwindcss').Config} */

/* MIDNIGHT & CHAMPAGNE SYSTEM — v6
   Midnight Blue #1B263B · Champagne Gold #F4EBD0 */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                /* ── Midnight Blue Scale ── */
                'midnight': {
                    950: '#0D1B2A',
                    900: '#1B263B',  /* ★ PRIMARY BG */
                    850: '#243B55',
                    800: '#415A77',
                    700: '#778DA9',
                    600: '#9CA3AF',
                },

                /* ── Champagne Gold Scale ── */
                'gold': {
                    500: '#F4EBD0',  /* ★ CHAMPAGNE GOLD */
                    400: '#E3D8B4',
                    300: '#D1C598',
                    200: '#B5A97D',
                    100: '#EAEAEA',  /* Soft Off-white for headings option */
                },
                'muted-gray': '#AAB3C5', /* Higher readability body text */

                /* Semantic aliases to maintain compatibility */
                'nightshade-pure': '#1B263B',
                accent: {
                    DEFAULT: '#F4EBD0',
                    hover  : '#E3D8B4',
                    soft   : 'rgba(244,235,208,0.12)',
                    glow   : 'rgba(244,235,208,0.45)',
                },
                'indigo-brand': {
                  300: '#F4EBD0',
                  250: '#E3D8B4',
                  200: '#D1C598',
                  500: '#F4EBD0',
                  800: '#243B55',
                  850: '#1B263B',
                  900: '#1B263B',
                  950: '#0D1B2A',
                },
                surface: 'rgba(27,38,59,0.70)',
                white: '#F4EBD0',
                gray: {
                    50: '#F4EBD0',
                    100: '#F4EBD0',
                    200: '#E3D8B4',
                    300: '#D1C598',
                    400: '#B5A97D',
                    500: '#8E8A7B',
                    600: '#7A7566',
                }
            },

            backgroundImage: {
                'gradient-primary':   'linear-gradient(180deg, #0B132B 0%, #1B263B 50%, #243B55 100%)',
                'gradient-premium':   'linear-gradient(135deg, #F4EBD0 0%, #EAD7B0 100%)',
                'gradient-deep':      'linear-gradient(180deg, #0F172A 0%, #1B263B 100%)',
                'gradient-luminous':  'linear-gradient(135deg, #F4EBD0 0%, #E3D8B4 100%)',
                'gradient-text':      'linear-gradient(135deg, #F4EBD0 0%, #EAEAEA 100%)',
                'gradient-card':      'linear-gradient(180deg, rgba(30, 42, 56, 0.8) 0%, rgba(34, 48, 68, 0.4) 100%)',
                'gradient-glow':      'radial-gradient(circle at 50% 50%, rgba(244, 235, 208, 0.15) 0%, transparent 70%)',
                'gradient-hero-bg':   'radial-gradient(ellipse at 30% 20%,rgba(244,235,208,0.10) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(65,90,119,0.15) 0%,transparent 55%)',
                
                /* Compatibility Aliases */
                'gradient-spiritual'  : 'linear-gradient(135deg,#1B263B 0%,#243B55 50%,#F4EBD022 100%)',
                'gradient-ocean'      : 'linear-gradient(135deg,#1B263B 0%,#0D1B2A 40%,#E3D8B411 100%)',
                'gradient-nature'     : 'linear-gradient(135deg,#F4EBD0 0%,#E3D8B4 50%,#B5A97D 100%)',
            },

            fontFamily: {
                display : ['Playfair Display',     'serif'],
                heading : ['Playfair Display',     'serif'],
                body    : ['Plus Jakarta Sans',    'sans-serif'],
                mono    : ['JetBrains Mono',       'monospace'],
            },

            animation: {
                'breathe'   : 'breathe      4s ease-in-out  infinite',
                'float'     : 'float        7s ease-in-out  infinite',
                'gradient'  : 'gradient-shift 14s ease      infinite',
                'spin-slow' : 'spin-slow    12s linear      infinite',
                'pulse-glow': 'pulse-glow    3s ease-in-out infinite',
                'fade-in'   : 'fadeIn       0.6s ease       both',
                'shimmer'   : 'shimmer      3.5s linear     infinite',
            },

            borderRadius: { '4xl':'2rem', '5xl':'3rem', '6xl':'4rem' },
            backdropBlur: { '3xl':'48px', '4xl':'72px' },
        },
    },
    plugins: [],
};
