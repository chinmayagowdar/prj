import type { Config } from 'tailwindcss'

export const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default {
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
