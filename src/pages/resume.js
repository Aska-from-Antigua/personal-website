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

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
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
        {isMobile ? (
          <div className={mobileMessage}>
            <p>PDF preview is not available on mobile browsers.</p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={downloadButton}>
              Open PDF in New Tab
            </a>
          </div>
        ) : (
          <iframe
            src="/resume-dark.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
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
