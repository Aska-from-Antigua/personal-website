import * as React from 'react'
import {
  footer,
  footerContent,
  footerLinks,
  footerLink,
} from './layout.module.css'

const Footer = ({ isHidden }) => {
  return (
    <footer className={`${footer} ${isHidden ? 'footerHidden' : ''}`}>
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
        <p>Built with <a href="https://kiro.dev" target="_blank" rel="noopener noreferrer" style={{color: '#9fa8da', textDecoration: 'underline'}}>Kiro</a> & <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer" style={{color: '#9fa8da', textDecoration: 'underline'}}>Gatsby</a> • Deployed on <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" style={{color: '#9fa8da', textDecoration: 'underline'}}>Netlify</a></p>
      </div>
    </footer>
  )
}

export default Footer
