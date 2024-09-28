/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-primary": "var(--brand-primary)",
				"brand-secondary": "var(--brand-secondary)",
				"brand-medium-gray": "var(--brand-medium-gray)",
				"brand-dark-gray": "var(--brand-dark-gray)",
			},
		},
	},
	plugins: [],
};
