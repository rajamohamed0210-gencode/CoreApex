/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',   // Soft Blue
          100: '#DBEAFE',  // Light Blue
          200: '#BFDBFE',  // Blue Border
          400: '#38BDF8',  // Sky Accent
          500: '#2563EB',  // Primary Royal Blue
          600: '#1D4ED8',  // Primary Hover Blue
          700: '#1E40AF',  // Active Blue
          800: '#1E293B',  // Primary Text
          900: '#172033',  // Deep Navy
          950: '#0F172A',
        },
        navy: {
          950: '#0B1120',
          900: '#172033',  // Official Deep Navy
          850: '#1E293B',  // Slate Dark
          800: '#334155',  // Slate Medium
        },
        royal: {
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        surface: {
          page: '#F8FAFC',
          card: '#FFFFFF',
          soft: '#EFF6FF',
          highlight: '#DBEAFE',
          border: '#E2E8F0',
          borderLight: '#F1F5F9',
          borderBlue: '#BFDBFE',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', '"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 30px -4px rgba(37, 99, 235, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 10px 30px -5px rgba(23, 32, 51, 0.1), 0 4px 12px -2px rgba(23, 32, 51, 0.05)',
        'button-glow': '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
        'glow': '0 0 0 1px rgba(37, 99, 235, 0.08), 0 18px 40px -14px rgba(37, 99, 235, 0.35)',
        'lift': '0 24px 48px -20px rgba(23, 32, 51, 0.28)',
      },
      backgroundImage: {
        'grid-blue': `linear-gradient(to right, rgba(37, 99, 235, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(37, 99, 235, 0.05) 1px, transparent 1px)`,
        'brand-gradient': 'linear-gradient(120deg, #2563EB 0%, #1D4ED8 45%, #38BDF8 100%)',
        'sheen': 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.65) 50%, transparent 80%)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-9px) rotate(-1.2deg)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.12)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.94)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.35)', opacity: '0' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'bar-grow': {
          '0%, 100%': { transform: 'scaleY(0.55)' },
          '50%': { transform: 'scaleY(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-soft': 'float-soft 7s ease-in-out infinite',
        'float-delayed': 'float 7.5s ease-in-out 1.2s infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'aurora-slow': 'aurora 26s ease-in-out infinite reverse',
        'marquee': 'marquee var(--marquee-duration, 38s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--marquee-duration, 38s) linear infinite',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'bar-grow': 'bar-grow 2.6s ease-in-out infinite',
        'blink': 'blink 1.05s step-end infinite',
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
        'rise-in': 'rise-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
