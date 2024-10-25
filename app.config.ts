export default defineAppConfig({
  name: "Victor Otávio Ferreira",
  description:
    "This is a blog made with Bloggrify. It is a simple and minimalist blog template. You can customize it as you want or use another template from Bloggrify. Enjoy !",
  url: "https://www.victorotavio.com.br",
  pagination: {
    per_page: 5,
  },
  authors: [
    {
      default: true,
      username: "john-doe",
      name: "John Doe",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      avatar: "/images/logo.png",
      socials: {
        twitter: "https://twitter.com",
        twitter_username: "username",
        mastodon: "https://piaille.fr",
        youtube: "https://youtube.com",
        linkedin: "https://linkedin.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        github: "https://github.com",
      },
    },
  ],
  menu: [
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Archives", path: "/archives" },
  ],
  socials: {
    twitter: "https://twitter.com",
    mastodon: "https://piaille.fr",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
    // see https://github.com/stefanobartoletti/nuxt-social-share
    sharing_networks: [
      "facebook",
      "twitter",
      "linkedin",
      "reddit",
      "whatsapp",
      "telegram",
    ],
  },
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
