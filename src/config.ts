export default {
  env: {
    DEBUG: Boolean(process.env.DEBUG),
    NODE_ENV: String(process.env.NODE_ENV) || "development",
  },
  source: "../content",
  destination: "../public",
  metadata: {
    siteurl: process.env.APP_URL || "http://localhost:3000",
    sitename: "Victor Ferreira Homepage",
    description: "",
    author: "Victor Ferreira",
    year: { from: "2007", to: new Date().getFullYear() },
  },
  collections: {},
  permalinks: {
    slug: {
      extend: {
        ".": "-",
      },
    },
    trailingSlash: true,
    date: "YYYY",
  },
  layouts: {
    directory: "../src/templates/layouts",
    default: "base.njk",
    engineOptions: {
      root: "src/templates",
    },
  },
};
