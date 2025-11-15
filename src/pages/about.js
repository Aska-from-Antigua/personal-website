import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import {
  aboutContainer,
  profileImage,
  aboutText,
  divider,
  pullQuote,
} from './about.module.css'

const AboutPage = () => {
  return (
    <Layout>
      <div className={aboutContainer}>
        <StaticImage
          src="../images/profile-pic.jpg"
          alt="Profile picture of Jerry Aska"
          className={profileImage}
        />
        <div className={aboutText}>
          <h2>About Me</h2>
          <p>I'm Jerry Aska — an engineer, chess player, teacher, and proud Antiguan.</p>

          <div className={divider}></div>

          <p>My story starts in Villa, Antigua, where I taught students, mentored kids, and spent afternoons helping people understand math, computers, or whatever they were struggling with. Those early moments shaped how I communicate, how I lead, and how I view responsibility.</p>

          <p>When I moved to New York to study Computer Engineering at NYU, that mindset came with me. I eventually served as Lead TA for Computer Architecture, guiding 160 students while coordinating a team of TAs.</p>

          <blockquote className={pullQuote}>
            "Teaching kept me grounded — no matter how complex a system gets, you should still be able to explain it simply."
          </blockquote>

          <div className={divider}></div>

          <p>Now I'm a software engineer working on backend and infrastructure-level problems. I like systems that require clarity, reliability, and long-term thinking — whether that's distributed services or the tools that keep teams aligned.</p>

          <p>Beyond work, I'm committed to giving back. In 2024, I started an annual scholarship at Villa Primary School, the same place where I taught. I also continue to mentor students and help where I can.</p>

          <div className={divider}></div>

          <p>Chess has also been a major part of my life. In 2018 I became the national champion of Antigua and Barbuda and represented my country at the Batumi World Chess Olympiad.</p>

          <blockquote className={pullQuote}>
            "The lessons from chess — patience, structure, calculated risks — are part of how I approach engineering and life."
          </blockquote>

          <div className={divider}></div>

          <p>I'm building a career and a future that stay true to where I'm from — mixing engineering, community, and long-term thinking in everything I do.</p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="About" description="Learn about Jerry Aska's journey from teaching in Antigua to software engineering at AWS, including his passion for education, chess, and community impact." />

export default AboutPage
