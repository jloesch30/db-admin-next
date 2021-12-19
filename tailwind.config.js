module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wave-pattern': "url('/public/assets/Db_dash_board_background.png')"
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "font-primary": "var(--font-primary)",
        "font-secondary": "var(--font-secondary)",
        "background-primary": "var(--background-primary)"
      }
    },
  },
  plugins: [],
}