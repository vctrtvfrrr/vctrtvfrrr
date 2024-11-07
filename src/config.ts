export default {
  env: {
    DEBUG: String(process.env['DEBUG']),
    NODE_ENV: String(process.env['NODE_ENV']) || 'development',
  },
  source: '../content',
  destination: '../public',
  metadata: {
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
        slug: 'tech/articles',
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
        slug: 'tech/notes',
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
        slug: 'theology',
      },
      pattern: 'Teologia/**/*.html',
      sortBy: 'pubdate',
      reverse: true,
      limit: 10,
    },
  },
  permalinks: {
    pattern: ':title',
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
        pattern: 'tech/articles/:date/:title',
        date: 'YYYY',
      },
      {
        match: { collection: 'techNotes' },
        pattern: 'tech/notes/:date/:title',
        date: 'YYYY',
      },
      {
        match: { collection: 'theology' },
        pattern: 'theology/:date/:title',
        date: 'YYYY',
      },
    ],
  },
  layouts: {
    default: 'content.njk',
  },
}
