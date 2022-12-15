/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: '0 !important',
              marginBottom: '0 !important',
            }
          },
        },
      },
      lineClamp: {
        7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12'
      },
      colors: {
        // put new colors & aliases here
        // primary: "#FD841F",
        'primary': {
          '50': '#fff9f4', 
          '100': '#fff3e9', 
          '200': '#ffe0c7', 
          '300': '#fecea5', 
          '400': '#fea962', 
          '500': '#fd841f', 
          '600': '#e4771c', 
          '700': '#be6317', 
          '800': '#984f13', 
          '900': '#7c410f'
        },
        'secondary': "#F4946C"
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'beat': 'beat 1s ease-out infinite',
        'fade-in': "fadeIn 500ms forwards",
        'fade-out': "fadeOut 500ms forwards",
        'slide-up': "slideUp 500ms forwards",
        'slide-down': "slideDown 500ms forwards",
        'fadeout-slidedown': "fadeOut 500ms forwards, slideDown 500ms forwards",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      }
    },
  },
  variants: {
    extend: {
      lineClamp: ["responsive", "hover"],
    }
  },
  plugins: [
    require("@tailwindcss/forms")({
      // strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
