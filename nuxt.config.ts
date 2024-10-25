// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@stefanobartoletti/nuxt-social-share",
  ],
  content: {
    markdown: {
      remarkPlugins: ["remark-reading-time"],
      // rehypePlugins: [],
    },
    highlight: {
      langs: [
        "json",
        "js",
        "javascript",
        "ts",
        "typescript",
        "html",
        "css",
        "vue",
        "shell",
        "bash",
        "mdc",
        "mermaid",
        "md",
        "yaml",
        "c",
        "php",
        "python",
        "sql",
        "xml",
      ],
      theme: {
        default: "github-light",
        dark: "one-dark-pro",
      },
    },
  },
  image: {
    format: ["webp"],
  },
  tailwindcss: {
    viewer: false,
  },
});
