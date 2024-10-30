import "dotenv/config";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Metalsmith from "metalsmith";
import collections from "@metalsmith/collections";
import layouts from "@metalsmith/layouts";
import markdown from "@metalsmith/markdown";
import permalinks from "@metalsmith/permalinks";

const __dirname = dirname(fileURLToPath(import.meta.url));
const t1 = performance.now();

Metalsmith(__dirname)
  .source("../content")
  .destination("../public")
  .clean(true)
  .env({
    DEBUG: Boolean(process.env.DEBUG),
    NODE_ENV: String(process.env.NODE_ENV) || "development",
  })
  .metadata({
    siteurl: "https://www.victorotavio.com.br/",
    sitename: "Victor Ferreira Homepage",
    description: "",
    author: "Victor Ferreira",
    year: { from: "2007", to: new Date().getFullYear() },
  })
  .use(markdown())
  // @ts-ignore
  .use(collections())
  // @ts-ignore
  .use(permalinks({ slug: { extend: { ".": "-" } }, trailingSlash: true }))
  .use(
    layouts({
      directory: join(__dirname, "../templates/layouts"),
      default: "base.njk",
      engineOptions: {
        root: join(__dirname, "../templates"),
      },
    })
  )
  .build((err) => {
    if (err) throw err;

    console.log(
      `Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`
    );
});
