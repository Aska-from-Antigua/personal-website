module.exports = {
  siteMetadata: {
    title: 'Jerry Aska',
    siteUrl: 'https://jerryaska.com',
    description: 'Software Development Engineer at Amazon Web Services, proud Antiguan focused on distributed systems, secure messaging infrastructure, and community impact.',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jerry Aska',
        short_name: 'Jerry Aska',
        start_url: '/',
        background_color: '#0a0e27',
        theme_color: '#6366f1',
        display: 'standalone',
        icon: 'static/favicon.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/blog/', '/calculator/', '/contact/', '/projects/'],
        serialize: ({ path }) => {
          // Homepage gets highest priority
          if (path === '/') {
            return {
              url: path,
              changefreq: 'weekly',
              priority: 1.0,
            }
          }
          // Media page changes when you add new links
          if (path === '/media/') {
            return {
              url: path,
              changefreq: 'monthly',
              priority: 0.8,
            }
          }
          // About and Resume change less frequently
          return {
            url: path,
            changefreq: 'monthly',
            priority: 0.7,
          }
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
