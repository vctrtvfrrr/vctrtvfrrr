// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxt/image-edge"],
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/vctrtvfrrr/image/upload/",
    },

    imgix: {
      baseURL: "https://images.unsplash.com/",
    },
    presets: {
      blog: {
        modifiers: {
          format: "webp",
          fit: "cover",
          quality: "80",
        },
      },
    },
  },
});
