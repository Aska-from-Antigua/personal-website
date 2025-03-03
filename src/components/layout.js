import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  container,
  header,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
  ctaButton,
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
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
    <div className={container}>
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
              <Link to="/projects" className={navLinkText}>Projects</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/blog" className={navLinkText}>Blog</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/contact" className={navLinkText}>Contact</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/calculator" className={navLinkText}>Calculator</Link>
            </li>
            <li>
              <button className={ctaButton}>Contact Me</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout
