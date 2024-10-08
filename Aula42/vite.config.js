import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_K_OMDBAPI': JSON.stringify(process.env.VITE_K_OMDBAPI),
    'process.env.VITE_K_TMDB': JSON.stringify(process.env.VITE_K_TMDB),
    'process.env.VITE_K_IPINFO': JSON.stringify(process.env.VITE_K_IPINFO)
  }
})
