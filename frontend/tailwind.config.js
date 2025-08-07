/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 필요에 따라 수정
  ],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/line-clamp'],
};
