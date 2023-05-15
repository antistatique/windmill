/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      blue: '#000032',
      gray: '#9898AB',
      pink: {
        DEFAULT: '#FF0099',
        dark: '#F20091',
      },
      yellow: '#FFF618',
      westar: '#DED6CF',
      error: '#FF531D',
      disabled: '#E5E5E5',
      background: '#F1ECE8',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      screens: {
        em: '375px',
      },
      height: {
        0.75: '3px',
      },
      outlineWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
