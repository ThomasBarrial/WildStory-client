/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend Deca', 'sans-serif'],
      },
      colors: {
        pink: '#EC6D6A',
        black: '#181818',
        lightblack: '#323232',
      },
      height: {
        desktop: '38rem',
        tablet: '30rem',
        comment: '34rem',
      },
      width: {
        feed: '900px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
