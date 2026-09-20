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
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 30px -4px rgba(37, 99, 235, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 10px 30px -5px rgba(23, 32, 51, 0.1), 0 4px 12px -2px rgba(23, 32, 51, 0.05)',
        'button-glow': '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
      },
    },
  },
  plugins: [],
}
