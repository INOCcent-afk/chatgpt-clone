/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-primary": "var(--brand-primary)",
				"brand-secondary": "var(--brand-secondary)",
				"brand-light-gray": "var(--brand-light-gray)",
				"brand-medium-gray": "var(--brand-medium-gray)",
				"brand-dark-gray": "var(--brand-dark-gray)",
			},
		},
	},
	plugins: [],
};
