// @ts-nocheck
import collections from '@metalsmith/collections'
import drafts from '@metalsmith/drafts'
import layouts from '@metalsmith/layouts'
import markdown from '@metalsmith/markdown'
import permalinks from '@metalsmith/permalinks'
import toc from '@metalsmith/table-of-contents'
import 'dotenv/config'
import Metalsmith from 'metalsmith'
import htmlMinifier from 'metalsmith-html-minifier'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import config from './config'
import { assets, images } from './plugins'

const __dirname = dirname(fileURLToPath(import.meta.url))
const isProduction = process.env['NODE_ENV'] === 'production'
const startTime = performance.now()

// To use a plugin conditionally
function noop() {}

Metalsmith(__dirname)
  .clean(true)
  .env(config.env)
  .source(config.source)
  .destination(config.destination)
  .metadata(config.metadata)
  .use(isProduction ? noop : drafts())
  .use(markdown())
  .use(collections(config.collections))
  .use(permalinks(config.permalinks))
  .use(images())
  .use(toc())
  .use(layouts(config.layouts))
  .use(assets())
  .use(isProduction ? htmlMinifier() : noop)
  .build((err) => {
    if (err) throw err
    console.log(`Build success in ${((performance.now() - startTime) / 1000).toFixed(1)}s`)
  })
