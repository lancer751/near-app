import animations from '@midudev/tailwind-animations'
/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'],
	theme: {
		extend: {
			backgroundImage:{
				"authentication": "url('/images/authentication-background.jpg')"
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
		animations
	],
}
