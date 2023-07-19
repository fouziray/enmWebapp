/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}','./src/*.{js,jsx,ts'],
  theme: {extend: {
    colors:{
      'primary': '#004145',
      'tahit': '#DFE8F1'
    }
  },
  },
  plugins: ["tailwindcss ,autoprefixer"],
}



// ['./pages/**/*.{js,jsx,ts,tsx,html}', './components/**/*.{js,jsx,ts,tsx,html}',], 