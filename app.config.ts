export default defineAppConfig({
  name: "Victor Ferreira",
  description:
    "This is a blog made with Bloggrify. It is a simple and minimalist blog template. You can customize it as you want or use another template from Bloggrify. Enjoy !",
  url: "https://www.victorotavio.com.br",
  pagination: {
    per_page: 5,
  },
  author: {
    name: "Victor Ferreira",
    description:
      "Líder Técnico | Arquiteto de Software | Mentor | Especialista em Desenvolvimento Web",
    avatar: "/images/logo.png",
    socials: {
      github: "https://github.com/vctrtvfrrr",
      linkedin: "https://linkedin.com/in/victorotavio",
      twitter: "https://twitter.com/vctrtvfrrr",
      twitter_username: "vctrtvfrrr",
      youtube: "https://www.youtube.com/@VictorOtavio",
    },
  },
  menu: [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Arquivo", path: "/archives" },
  ],
  // see https://github.com/stefanobartoletti/nuxt-social-share
  sharing_networks: [
    "facebook",
    "twitter",
    "linkedin",
    "reddit",
    "whatsapp",
    "telegram",
  ],
  newsletter: {
    enabled: true,
    form_action: "YOUR_NEWSLETTER_FORM_ACTION",
    provider: "demo",
  },
  comments: {
    enabled: false,
    hyvor_talk: {
      website_id: "YOUR_HYVOR_TALK_WEBSITE_ID",
    },
  },
});
