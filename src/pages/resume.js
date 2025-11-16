import * as React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {
  resumeContainer,
  resumeHeader,
  downloadButton,
  pdfViewer,
  mobileMessage,
} from './resume.module.css'

const ResumePage = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

    // Load theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }

    // Listen for theme changes
    const handleStorageChange = () => {
      const theme = localStorage.getItem('theme')
      setIsDark(theme === 'dark')
    }

    window.addEventListener('storage', handleStorageChange)

    // Also listen for custom theme change event
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    window.addEventListener('themeChange', handleThemeChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('themeChange', handleThemeChange)
    }
  }, [])

  const resumePdf = isDark ? '/resume-dark.pdf' : '/resume-light.pdf'

  return (
    <Layout>
      <div className={resumeContainer}>
        <div className={resumeHeader}>
          <h1>Resume</h1>
          <a href={resumePdf} download="Jerry_Aska_Resume.pdf" className={downloadButton}>
            Download PDF
          </a>
        </div>
        {isMobile ? (
          <div className={mobileMessage}>
            <p>PDF preview is not available on mobile browsers.</p>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer" className={downloadButton}>
              Open PDF in New Tab
            </a>
          </div>
        ) : (
          <iframe
            key={resumePdf}
            src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className={pdfViewer}
            title="Jerry Aska Resume"
          />
        )}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Resume" description="View Jerry Aska's professional resume - Software Development Engineer with experience in backend systems, Kubernetes, and AWS infrastructure." />

export default ResumePage
