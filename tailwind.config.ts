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
        // Website public — Direction B: Cemento + Verde
        'site-bg':      '#070909',
        'site-text':    '#F4F1EA',
        'site-accent':  '#61D398',
        'site-surface': '#101514',
        'site-border':  '#26312E',
        'site-muted':   '#9B9990',
        'site-white':   '#151B1A',
        'site-blue':    '#31A8FF',
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        jakarta:  ['var(--font-jakarta)', 'sans-serif'],
        display:  ['var(--font-space-grotesk)', 'sans-serif'],
        oswald:   ['var(--font-oswald)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
