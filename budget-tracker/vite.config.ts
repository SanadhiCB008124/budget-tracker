import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {ManifestOptions, VitePWA} from 'vite-plugin-pwa'

const manifestForPlugin :Partial<ManifestOptions> ={
  name: "budget-tracker",
  short_name: "budget-tracker",
  start_url: "/",
  scope: "./",
  display: "standalone",
  background_color: "#000000",
  description: "budget-tracker",
  theme_color: "#000000",
  orientation: "portrait",
  
  icons: [
    {
      src: "favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      src: "favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },

    {
      src: "android-icon-144x144.png",
      sizes: "144x144",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable",

    },
    {
      src: "android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
     

    }



  ],
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  plugins: [react(), 
    VitePWA({
      manifest: manifestForPlugin,
    }),
    ],
})
