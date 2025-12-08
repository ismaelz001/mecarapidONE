import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mr-bg': '#0f1513',
        'mr-primary': '#2E604C',
        'mr-secondary': '#3C735D',
        'mr-accent': '#61D398',
        'mr-text': '#f5f7f6',
        'mr-border': '#2a3a35',
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
