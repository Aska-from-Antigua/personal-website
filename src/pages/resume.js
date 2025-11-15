import * as React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {
  resumeContainer,
  resumeHeader,
  downloadButton,
  pdfViewer,
} from './resume.module.css'

const ResumePage = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check theme on mount and when it changes
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme')
      setIsDark(!savedTheme || savedTheme === 'dark')
    }

    checkTheme()

    // Listen for storage changes (theme toggle)
    window.addEventListener('storage', checkTheme)

    // Poll for theme changes (since we're on the same page)
    const interval = setInterval(checkTheme, 100)

    return () => {
      window.removeEventListener('storage', checkTheme)
      clearInterval(interval)
    }
  }, [])

  return (
    <Layout>
      <div className={resumeContainer}>
        <div className={resumeHeader}>
          <h1>Resume</h1>
          <a href="/resume.pdf" download="Jerry_Aska_Resume.pdf" className={downloadButton}>
            Download PDF
          </a>
        </div>
        <iframe
          src={`/${isDark ? 'resume-dark' : 'resume'}.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          className={pdfViewer}
          title="Jerry Aska Resume"
          key={isDark ? 'dark' : 'light'}
        />
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Resume" />

export default ResumePage
