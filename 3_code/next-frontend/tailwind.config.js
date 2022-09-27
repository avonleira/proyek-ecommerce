/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      // strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
}
