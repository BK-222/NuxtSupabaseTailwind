// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/google-fonts'],
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.SUPABASE_URL || '',
        key: process.env.SUPABASE_KEY || ''
      }
    }
  }
})
