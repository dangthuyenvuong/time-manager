/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        primary: {
          DEFAULT: 'rgb(0 173 181)',
          50: 'rgb(0 173 181 / 5%)',
          100: 'rgb(0 173 181 / 10%)',
          200: 'rgb(0 173 181 / 20%)',
          300: 'rgb(0 173 181 / 30%)',
          400: 'rgb(0 173 181 / 40%)',
          500: 'rgb(0 173 181 / 50%)',
          600: 'rgb(0 173 181 / 60%)',
          700: 'rgb(0 173 181 / 70%)',
          800: 'rgb(0 173 181 / 80%)',
          900: 'rgb(0 173 181 / 90%)',
        }
      },
    },
  },
  plugins: [],
}
