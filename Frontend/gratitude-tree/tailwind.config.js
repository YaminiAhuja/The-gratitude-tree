/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    extend: {
      fontFamily:{
        "fleur" : ["Fleur De Leah", 'cursive'],
        "tangerine":["Tangerine", 'cursive']
      },
      colors: {
        heading :'#dea0b4',
        primary: '#FF5E84',
        secondary: '#5CDB95',
        accent: '#FFF8DC',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        textPrimary: '#333333',
        textSecondary: '#666666',
        borderColor: '#E5E7EB',
        error: '#FF6B6B',
        success: '#4DC9B0',
        moodGradientStart: '#3A86FF',
        moodGradientMid: '#FFD60A',
        moodGradientEnd: '#FF005C',
      }
    },
  },
  plugins: [],
}

