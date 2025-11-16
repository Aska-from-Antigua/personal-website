import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  header,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
  themeToggle,
} from './layout.module.css'

const Header = ({ isDark, toggleTheme }) => {
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
  )
}

export default Header
