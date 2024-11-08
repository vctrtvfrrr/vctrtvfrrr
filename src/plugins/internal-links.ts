import * as cheerio from 'cheerio'
import type Metalsmith from 'metalsmith'
import { basename } from 'node:path'
import type { AssociativeArray, File } from '../types'

export function internalLinks() {
  return function internalLinks(
    files: { [key: string]: File },
    metalsmith: Metalsmith,
    done: (msg?: string) => void
  ) {
    setImmediate(done)

    const mapped: AssociativeArray = {}
    Object.values(files).forEach((file) => {
      if (!file.permalink) return false
      mapped[file.originalPath] = file.permalink !== 'index' ? `/${file.permalink}` : '/'
    })

    metalsmith.match('**/*.html', Object.keys(files)).forEach((filePath) => {
      const file = files[filePath]
      const $ = cheerio.load(file.contents.toString(), null, false)

      $('a[href]').each((_, el) => {
        const href = decodeURIComponent(el.attribs['href'])
        const isInternalLink = href && !href.startsWith('#') && !href.startsWith('http')

        if (!isInternalLink) return

        const base = basename(href)
        const permalink = Object.keys(mapped).find((key) => key.endsWith(base))

        if (!permalink) return

        el.attribs['href'] = mapped[permalink]
      })

      file.contents = Buffer.from($.html())
    })
  }
}

export default internalLinks
