module.exports = {
  siteMetadata: {
    title: 'Jerry Aska',
    siteUrl: 'https://site.jerryaska.com',
    description: 'Software Development Engineer at Amazon Web Services, proud Antiguan focused on distributed systems, secure messaging infrastructure, and community impact.',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
