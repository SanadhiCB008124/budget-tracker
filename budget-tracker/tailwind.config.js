/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js}",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors:{
        "gray-20":"#F8F4EB",
        "gray-50":"#EFE6E6",
        "gray-190":"#DFCCCC",
        "primary":"#FFFFFF",
        "primary-300":"#1F0B24",
        "primary-500":"#000000",
        "secondary-400":"#976CE1",
        "secondary-500":"#FFC132",
      },
      backgroundImage: theme => ({
        "gradient-yellowred": "linear-gradient(90deg, #FF616A 0%, #FFC132 100%)",
        'mobile-home':"url('./assets/images/home.jpg')",

      }),
      fontFamily:{
        dmsans:['DM Sans', 'sans-serif'],
        montserrat:['Montserrat', 'sans-serif'],
        roboto:['Roboto', 'sans-serif'],
      },
      content:{
        evolvetext:"url('./assets/images/evolvetext.png')",
        abstractwaves:"url('./assets/images/AbstractWaves.png')",
        sparkles:"url('./assets/images/sparkles.png')",
        circles:"url('./assets/images/Circles.png')",

      }

    },

    screens:{
      xs:"480px",
      ss:"620px",
      sm:"768px",
      md:"1060px",
      lg:"1200px",
      xl:"1700px"
    }
  },
  plugins: [require("daisyui")],
}

