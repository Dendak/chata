/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent:       'rgb(191 85 48)',
        'accent-s':   'rgb(212 117 90)',
        dark:         'rgb(19 16 9)',
        warm:         'rgb(243 237 227)',
      },
      fontFamily: {
        serif: ['"Cormorant Garant"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
