/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7ac7fc',
          400: '#34adf8',
          500: '#0c96eb',
          600: '#0078c9',
          700: '#0060a3',
          800: '#005187',
          900: '#064570',
          950: '#042c4a',
        },
        accent: {
          50: '#fbf1ff',
          100: '#f6e1ff',
          200: '#eec5ff',
          300: '#e499ff',
          400: '#d55fff',
          500: '#c030f8',
          600: '#a618e8',
          700: '#8d0ec9',
          800: '#7311a5',
          900: '#610d87',
          950: '#420064',
        },
        // Add the gray color palette for Tailwind CSS v4
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Clash Display"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'gradient-x': 'gradient 8s ease infinite',
        'gradient-xy': 'gradientXY 15s ease infinite',
        'shine': 'shine 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientXY: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backgroundImage: {
        'hero-pattern': 'url("/images/hero-pattern.png")',
        'dots-pattern': 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'highlight': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'glow': '0 0 20px rgba(156, 39, 176, 0.5)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'white',
            a: {
              color: '#0c96eb',
              '&:hover': {
                color: '#c030f8',
              },
            },
            strong: {
              color: 'white',
            },
            h1: {
              color: 'white',
            },
            h2: {
              color: 'white',
            },
            h3: {
              color: 'white',
            },
            h4: {
              color: 'white',
            },
            h5: {
              color: 'white',
            },
            h6: {
              color: 'white',
            },
            code: {
              color: 'white',
            },
            figcaption: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            blockquote: {
              color: 'rgba(255, 255, 255, 0.9)',
              borderLeftColor: '#0c96eb',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
