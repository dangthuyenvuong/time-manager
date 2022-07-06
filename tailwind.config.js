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
          50: '#00ADB505',
          100: '#00ADB510',
          200: '#00ADB520',
          300: '#00ADB530',
          400: '#00ADB540',
          500: '#00ADB550',
          600: '#00ADB560',
          700: '#00ADB570',
          800: '#00ADB580',
          900: '#00ADB590',
        }
      },
    },
  },
  plugins: [],
}
