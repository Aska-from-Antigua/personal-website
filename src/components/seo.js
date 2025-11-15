import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description, image, url }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl

  const defaultDescription = "Jerry Aska is a Software Development Engineer at Amazon Web Services, a proud Antiguan focused on secure messaging, distributed systems, and community impact through education and philanthropy."
  const defaultImage = `${siteUrl}/og-image.png`

  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  const metaUrl = url || siteUrl
  const pageTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} – Software Development Engineer @ AWS`

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Helmet>
  )
}

export default Seo
