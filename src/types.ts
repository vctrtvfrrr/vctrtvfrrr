export type File = {
  contents: Buffer
  path: string
  collection: string[]
  permalink: string
  originalPath: string
}

export type AssociativeArray = {
  [key: string]: string
}
