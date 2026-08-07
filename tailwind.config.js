/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#131313',
        'surface-bright': '#393939',
        'on-surface': '#e4e2e1',
        primary: '#c9c6c5',
        'on-primary': '#313030',
        tertiary: '#b8c3ff',
        'electric-cobalt': '#2E5BFF',
        'muted-slate': '#262626',
        'stark-white': '#F5F5F5',
      },
    },
  },
  plugins: [],
}