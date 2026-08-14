/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          base: '#050505',
          raised: '#0B0B0B',
        },
        line: 'rgba(255,255,255,0.08)',
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#60A5FA',
        },
        success: '#22C55E',
        muted: '#A8A8A8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '-0.04em',
        tightish: '-0.02em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 0 80px -20px rgba(59,130,246,0.45)',
        soft: '0 10px 40px -12px rgba(0,0,0,0.6)',
        card: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 50px -20px rgba(0,0,0,0.7)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridpulse: {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
        glowBreathe: {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        gridpulse: 'gridpulse 8s ease-in-out infinite',
        'glow-breathe': 'glowBreathe 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
