/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "node_modules/preline/preline.js", // ✅ add this
  ],
  theme: {
    extend: {},
  },
  plugins: [import("preline/plugin")], // ✅ Preline plugin
};
