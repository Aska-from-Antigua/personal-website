import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description, image, pathname }) => {
  const [themeColor, setThemeColor] = React.useState('#0a0e27')

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

  // Update theme color based on user's toggle
  React.useEffect(() => {
    const updateThemeColor = () => {
      const savedTheme = localStorage.getItem('theme')
      const isDark = savedTheme === 'dark' || !savedTheme
      setThemeColor(isDark ? '#0a0e27' : '#f5e6e6')
    }

    updateThemeColor()

    // Listen for theme changes
    const handleThemeChange = (e) => {
      setThemeColor(e.detail.isDark ? '#0a0e27' : '#f5e6e6')
    }
    window.addEventListener('themeChange', handleThemeChange)

    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl

  const defaultDescription = "Jerry Aska is a Software Development Engineer at Amazon Web Services, a proud Antiguan focused on secure messaging, distributed systems, and community impact through education and philanthropy."
  const defaultImage = `${siteUrl}/og-image.jpg`

  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  // Construct full URL from siteUrl + pathname (defaults to homepage)
  const metaUrl = pathname ? `${siteUrl}${pathname}` : siteUrl
  const pageTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} – Software Development Engineer @ AWS`

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="theme-color" content={themeColor} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

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

      <link rel="canonical" href={metaUrl} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Preload critical font for faster rendering */}
      <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      {/* Simple Analytics - 100% privacy-first analytics */}
      <script defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
    </>
  )
}

export default Seo
