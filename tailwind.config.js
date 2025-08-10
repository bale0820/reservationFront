/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 안 JS/TS/React 파일 스캔
    "./src/app/**/*.{js,ts,jsx,tsx}", // app router 쓰면 app 폴더도 스캔
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
