/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend Deca', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.25rem',
      },
      colors: {
        pink: '#EC6D6A',
        black: '#181818',
        lightblack: '#323232',
        dark: '#050505',
        bg: 'linear-gradient(180deg, #181818 0%, #613939 100%)',
      },
      height: {
        desktop: '32rem',
        tablet: '40rem',
        comment: '34rem',
        messenger: '86%',
        message: '70%',
        newmessage: '62%',
        span: '0.25rem',
      },
      width: {
        feed: '69%',
        uploadImage: '98%',
        comments: '47%',
      },
      margin: {
        span: '0.15rem',
      },
      screens: {
        xl: '1150px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
