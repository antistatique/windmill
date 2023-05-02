/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			white: '#ffffff',
			blue: '#000032',
			gray: '#9898AB',
			pink: '#FF0099',
			background: '#DED6CF',
		},
		extend: {},
	},
	plugins: [],
};
