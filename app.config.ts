export default {
  source: './content',
  destination: './public',
  metadata: {
    isProduction: process.env['NODE_ENV'] === 'production',
    siteurl: process.env['APP_URL'] || 'http://localhost:3000',
    sitename: "Victor Ferreira's Homepage",
    description:
      'Homepage de Victor Ferreira, desenvolvedor e teólogo. Aqui você encontrará artigos, notas e projetos sobre tecnologia e teologia.',
    abstract: 'Homepage de Victor Ferreira, desenvolvedor e teólogo',
    keywords:
      'Victor Ferreira, homepage, blog, artigos, notas, projetos, currículo, tecnologia, teologia',
    author: 'Victor Ferreira',
    year: { from: '2007', to: new Date().getFullYear() },
    googletagmanager: String(process.env['GOOGLE_TAG_MANAGER']),
  },
  collections: {
    techArticles: {
      metadata: {
        title: 'Tecnologia - Artigos',
        description: 'Artigos sobre tecnologia',
        slug: 'tecnologia/artigos',
      },
      pattern: 'Tecnologia/Artigos/**/*.html',
      sortBy: 'pubdate',
      reverse: true,
      limit: 10,
    },
    techNotes: {
      metadata: {
        title: 'Tecnologia - Notas',
        description: 'Notas sobre tecnologia',
        slug: 'tecnologia/notas',
      },
      pattern: 'Tecnologia/Notas/**/*.html',
      sortBy: 'date',
      reverse: true,
      limit: 10,
    },
    theology: {
      metadata: {
        title: 'Teologia',
        description: 'Artigos sobre teologia',
        slug: 'teologia',
      },
      pattern: 'Teologia/**/*.html',
      sortBy: 'pubdate',
      reverse: true,
      limit: 10,
    },
  },
  permalinks: {
    trailingSlash: true,
    date: 'YYYY',
    slug: {
      extend: {
        '.': '-',
      },
    },
    linksets: [
      {
        match: { collection: 'techArticles' },
        pattern: 'tecnologia/artigos/:date/:title',
        date: 'YYYY',
      },
      {
        match: { collection: 'techNotes' },
        pattern: 'tecnologia/notas/:date/:title',
        date: 'YYYY',
      },
      {
        match: { collection: 'theology' },
        pattern: 'teologia/:date/:title',
        date: 'YYYY',
      },
    ],
  },
  layouts: {
    default: 'content.njk',
    directory: './src/layouts',
    engineOptions: {
      filters: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        debug(input: any) {
          console.log(input)
          return input
        },
      },
    },
  },
}
