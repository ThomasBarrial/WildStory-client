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
        dark: '#101010',
      },
      height: {
        desktop: '32rem',
        tablet: '28rem',
        comment: '34rem',
        span: '0.25rem',
      },
      width: {
        feed: '900px',
      },
      margin: {
        span: '0.15rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
