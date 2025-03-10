/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  background: 'var(--background)', // Use CSS variable directly
		  foreground: 'var(--foreground)', // Use CSS variable directly
		  border: 'var(--border)', // Define border color
		  card: {
			DEFAULT: 'var(--card)', // Use CSS variable directly
			foreground: 'var(--card-foreground)', // Use CSS variable directly
		  },
		  popover: {
			DEFAULT: 'var(--popover)', // Use CSS variable directly
			foreground: 'var(--popover-foreground)', // Use CSS variable directly
		  },
		  primary: {
			DEFAULT: 'var(--primary)', // Use CSS variable directly
			foreground: 'var(--primary-foreground)', // Use CSS variable directly
		  },
		  secondary: {
			DEFAULT: 'var(--secondary)', // Use CSS variable directly
			foreground: 'var(--secondary-foreground)', // Use CSS variable directly
		  },
		  muted: {
			DEFAULT: 'var(--muted)', // Use CSS variable directly
			foreground: 'var(--muted-foreground)', // Use CSS variable directly
		  },
		  accent: {
			DEFAULT: 'var(--accent)', // Use CSS variable directly
			foreground: 'var(--accent-foreground)', // Use CSS variable directly
		  },
		  destructive: {
			DEFAULT: 'var(--destructive)', // Use CSS variable directly
			foreground: 'var(--destructive-foreground)', // Use CSS variable directly
		  },
		  input: 'var(--input)', // Use CSS variable directly
		  ring: 'var(--ring)', // Use CSS variable directly
		  chart: {
			1: 'var(--chart-1)', // Use CSS variable directly
			2: 'var(--chart-2)', // Use CSS variable directly
			3: 'var(--chart-3)', // Use CSS variable directly
			4: 'var(--chart-4)', // Use CSS variable directly
			5: 'var(--chart-5)', // Use CSS variable directly
		  },
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate"),
	  require('tailwind-scrollbar'),
	],
  };