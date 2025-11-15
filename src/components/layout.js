import * as React from 'react'
import { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  container,
  header,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
  ctaButton,
  footer,
  footerContent,
  footerLinks,
  footerLink,
  themeToggle,
  lightMode,
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  const [isDark, setIsDark] = useState(true)

  // Load theme preference on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  // Save theme preference when it changes
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={`${container} ${!isDark ? lightMode : ''}`}>
      <header className={header}>
        <div className={siteTitle}>{data.site.siteMetadata.title}</div>
        <nav>
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link to="/" className={navLinkText}>Home</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/about" className={navLinkText}>About</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/resume" className={navLinkText}>Resume</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/media" className={navLinkText}>Media</Link>
            </li>
            <li className={navLinkItem}>
              <button
                onClick={toggleTheme}
                className={themeToggle}
                aria-label="Toggle theme"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer className={footer}>
        <div className={footerContent}>
          <p>© {new Date().getFullYear()} Jerry Aska</p>
          <div className={footerLinks}>
            <a href="mailto:contact@jerryaska.com" className={footerLink}>contact@jerryaska.com</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/jerry-aska/" target="_blank" rel="noopener noreferrer" className={footerLink}>LinkedIn</a>
            <span>•</span>
            <a href="https://github.com/Aska-from-Antigua/" target="_blank" rel="noopener noreferrer" className={footerLink}>GitHub</a>
            <span>•</span>
            <a href="https://www.google.com/maps/place/New+York+Metropolitan+Area/@40.8212916,-74.6759369,8.3z/data=!4m6!3m5!1s0x89c286d6e07696fb:0xca34053f4678c888!8m2!3d40.7127761!4d-74.0059544!16s%2Fg%2F11cn6k49x1?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className={footerLink}>New York Metropolitan Area</a>
          </div>
          <p>Built with <a href="https://kiro.dev" target="_blank" rel="noopener noreferrer" style={{color: '#9fa8da', textDecoration: 'underline'}}>Kiro</a> • Powered by <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer" style={{color: '#9fa8da', textDecoration: 'underline'}}>Gatsby</a></p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
