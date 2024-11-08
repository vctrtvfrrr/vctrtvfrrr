import type Metalsmith from 'metalsmith'
import type { File } from '../types'

export function originalData() {
  return function originalData(
    files: { [key: string]: File },
    _: Metalsmith,
    done: (msg?: string) => void
  ) {
    setImmediate(done)
    Object.keys(files).forEach((filePath) => {
      files[filePath].originalPath = filePath
    })
  }
}
