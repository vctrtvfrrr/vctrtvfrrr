import type Metalsmith from 'metalsmith'
import fs from 'node:fs'
import type { File } from '../types'

const defaultOptions = {
  source: 'assets',
  destination: 'assets',
}

export function assets(options: typeof defaultOptions = defaultOptions) {
  options = Object.assign({}, defaultOptions, options)

  return function assets(
    _: { [key: string]: File },
    metalsmith: Metalsmith,
    done: (msg?: string) => void
  ) {
    const debug = metalsmith.debug('plugins/assets')

    setImmediate(done)

    const source = metalsmith.path(options.source)
    debug.info('source directory: %O', source)
    const destination = metalsmith.path(metalsmith.destination(), options.destination)
    debug.info('destination directory: %O', destination)

    try {
      fs.cpSync(source, destination, { recursive: true })
    } catch (err) {
      debug.error(err)
      done('An error occured while copying the directory')
    }
  }
}

export default assets
