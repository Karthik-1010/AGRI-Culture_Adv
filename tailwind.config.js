/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          primary: '#26734D',
          primaryLight: '#328d60',
          primaryHover: '#1f5f3e',
          dark: '#174B35',
          darker: '#0f3123',
          earth: '#805638',
          earthLight: '#9b6c48',
          earthHover: '#6b462c',
          yellow: '#F4C542',
          yellowLight: '#fae188',
          yellowHover: '#e0b02f',
          light: '#F6F9F6',
          surface: '#FFFFFF',
          subtle: '#E8EFEA',
          border: '#D2E0D5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 75, 53, 0.08)',
        'soft-lg': '0 12px 30px -4px rgba(23, 75, 53, 0.12)',
        'soft-xl': '0 20px 40px -6px rgba(23, 75, 53, 0.16)',
      }
    },
  },
  plugins: [],
}
