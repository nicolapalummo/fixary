/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0b', // Zinc-950/Black friendly dark gray
                surface: '#18181b', // Zinc-900 for cards
                primary: {
                    DEFAULT: '#9333ea', // Purple 600
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#9333ea', // Remapped to Purple to enforce consistency
                    foreground: '#ffffff',
                },
                muted: {
                    DEFAULT: 'rgba(147, 51, 234, 0.1)',
                    foreground: '#a1a1aa',
                },
                accent: {
                    purple: '#9333ea',
                    // removed emerald to avoid accidental usage
                }
            },
            fontFamily: {
                sans: ['Link Sans', 'sans-serif'],
                display: ['Link Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
            }
        },
    },
    plugins: [],
}
