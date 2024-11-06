import * as cheerio from 'cheerio'
import { decode } from 'entities'
import hljs from 'highlight.js'
import type Metalsmith from 'metalsmith'
import type { File } from '../types'

export function highlight() {
  return function highlight(
    files: { [key: string]: File },
    metalsmith: Metalsmith,
    done: (msg?: string) => void
  ) {
    const debug = metalsmith.debug('plugins/highlight')

    setImmediate(done)

    metalsmith.match('**/*.html', Object.keys(files)).forEach((filePath) => {
      const file = files[filePath]
      const contents = file.contents.toString()
      const $ = cheerio.load(contents, {}, false)
      const codeBlocks = $('code')

      if (codeBlocks.length === 0) return

      debug.info(`highlighting ${filePath}`)

      codeBlocks.each((_, code) => {
        const $code = $(code)
        const htmlCode = $code.html()

        if (htmlCode === null) return

        const classes = $code.attr('class')
        let language = null

        if (classes) {
          const langClass = classes.split(' ').find((c) => c.startsWith('language-'))
          language = langClass ? langClass.split('-')[1] : null
        }

        let highlightedCode = null

        if (language) {
          highlightedCode = hljs.highlight(decode(htmlCode), { language }).value
        } else {
          highlightedCode = hljs.highlightAuto(decode(htmlCode)).value
        }

        $code.html(highlightedCode)
      })

      file.contents = Buffer.from($.html())
    })
  }
}

export default highlight
