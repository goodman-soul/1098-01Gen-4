/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#E8F0FB',
          100: '#C7D9F3',
          200: '#94B4E7',
          300: '#5A8AD6',
          400: '#2E69C4',
          500: '#1E56A0',
          600: '#184582',
          700: '#123361',
          800: '#0C2241',
          900: '#061120',
        },
        accent: {
          50: '#FFF1E8',
          100: '#FFD9C2',
          200: '#FFB88C',
          300: '#FF9457',
          400: '#FF7A33',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#C44822',
          800: '#9E3819',
          900: '#7A2911',
        },
        dark: {
          50: '#F5F5F7',
          100: '#E4E4E8',
          200: '#C8C8D0',
          300: '#A1A1AF',
          400: '#7A7A8D',
          500: '#535366',
          600: '#3D3D4D',
          700: '#2A2A36',
          800: '#1A1A2E',
          900: '#0F0F1A',
        },
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
