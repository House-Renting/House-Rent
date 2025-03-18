/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}", // Ensure this line includes the app directory
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Sky blue background from globals.css
        foreground: "var(--foreground)", // Text color from globals.css
      },
    },
  },
  plugins: [],
};
