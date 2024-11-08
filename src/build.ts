// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import collections from '@metalsmith/collections'
import drafts from '@metalsmith/drafts'
import layouts from '@metalsmith/layouts'
import markdown from '@metalsmith/markdown'
import permalinks from '@metalsmith/permalinks'
import toc from '@metalsmith/table-of-contents'
import browserSync from 'browser-sync'
import 'dotenv/config'
import Metalsmith from 'metalsmith'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import config from '../app.config'
import { assets, highlight, images, internalLinks, originalData } from './plugins'

const __dirname = dirname(fileURLToPath(import.meta.url))
const isProduction = process.env['NODE_ENV'] === 'production'

let devServer = null
let startTime = performance.now()

function noop() {}

function msBuild() {
  return Metalsmith(resolve(__dirname, '..'))
    .clean(true)
    .env(process.env)
    .watch(isProduction ? false : ['content', 'src', 'static'])
    .source(config.source)
    .destination(config.destination)
    .metadata(config.metadata)
    .use(originalData())
    .use(isProduction ? drafts() : noop)
    .use(markdown())
    .use(collections(config.collections))
    .use(permalinks(config.permalinks))
    .use(internalLinks())
    .use(images())
    .use(highlight())
    .use(toc())
    .use(layouts(config.layouts))
    .use(assets())
}

const ms = msBuild()
ms.build((err) => {
  if (err) throw err
  console.log(`Build success in ${((performance.now() - startTime) / 1000).toFixed(1)}s`)

  if (ms.watch() === false) return
  if (devServer) {
    startTime = performance.now()
    devServer.reload()
  } else {
    devServer = browserSync.create()
    devServer.init({
      host: 'localhost',
      server: config.destination,
      port: process.env['PORT'] || 3000,
      injectChanges: false,
      open: false,
    })
  }
})
