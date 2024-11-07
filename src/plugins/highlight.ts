import * as cheerio from 'cheerio'
import { decode } from 'entities'
import hljs from 'highlight.js'
import type Metalsmith from 'metalsmith'
import type { File } from '../types'

function identifyLanguage(classAttr: string) {
  const classes = classAttr.split(' ')
  const langClass = classes.find((c) => c.startsWith('language-'))
  const lang = langClass ? hljs.getLanguage(langClass.split('-')[1]) : null

  return lang ? lang.aliases?.at(0) : null
}

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

      debug.info(`Highlighting file: ${filePath}`)

      codeBlocks.each((_, code) => {
        const $code = $(code)
        const htmlCode = $code.html()

        if (htmlCode === null) return

        const classAttr = $code.attr('class')
        const language = classAttr ? identifyLanguage(classAttr) : null

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
