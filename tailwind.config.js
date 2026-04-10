/** @type {import('tailwindcss').Config} /
module.exports = {
content: [
"./pages/**/.{js,ts,jsx,tsx}",
"./components/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {
colors: {
ingod: {
primary: "#2563eb",
secondary: "#1e40af",
accent: "#f59e0b",
}
}
},
},
plugins: [],
};