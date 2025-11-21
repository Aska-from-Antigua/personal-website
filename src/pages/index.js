import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import FlipCard from '../components/FlipCard'
import { StaticImage } from 'gatsby-plugin-image'
import {
  heroSection,
  heroText,
  heroOverlay,
  heroImage,
  scrollIndicator,
  introSection,
  highlightsSection,
  cardsGrid,
} from './index.module.css'

const IndexPage = () => {
  return (
    <Layout>
      <div className={heroSection}>
        <StaticImage
          src="../images/hero-background.png"
          alt="Hero background"
          layout="fullWidth"
          placeholder="blurred"
          className={heroImage}
        />
        <div className={heroOverlay}></div>
        <div className={heroText}>
          <h1>Jerry Aska</h1>
          <p>Computer Engineer • Lifelong Learner • Proud Antiguan</p>
          <div className={scrollIndicator}>
            <span>↓</span>
          </div>
        </div>
      </div>

      <section className={introSection}>
        <h2>Welcome</h2>
        <p>
          I'm a Software Development Engineer at Amazon Web Services, where I work on distributed systems, secure messaging infrastructure, and Kubernetes-based backend services. I care about building reliable systems, writing clean abstractions, and creating tools that make teams more effective.
        </p>
        <p>
          I was born and raised in Antigua, where I taught students and mentored kids before moving into engineering. That background shaped how I think about leadership, clarity, and community — qualities I bring into every team I join.
        </p>
        <p>
          I split my time between building software, supporting the next generation of Antiguan students, and exploring big ideas through long-term projects.
        </p>
      </section>

      <section className={highlightsSection}>
        <h2>Highlights</h2>
        <div className={cardsGrid}>
          <FlipCard
            icon="💼"
            title="Career"
            subtitle="Building the future"
            backContent={
              <>
                <h4>Software Development Engineer II</h4>
                <p><strong>Amazon Web Services • 2023 - Present</strong></p>
                <p>I work on backend systems powering Wickr's secure messaging platform, including Kubernetes infrastructure, API services, and distributed storage components.</p>
                <p>I also drive cultural impact — organizing social events, supporting onboarding, and contributing to a stronger Wickr NYC team culture.</p>
                <p><Link to="/resume" onClick={(e) => e.stopPropagation()} style={{color: '#6366f1', textDecoration: 'underline', fontWeight: '600'}}>→ View Full Resume</Link></p>
              </>
            }
          />

          <FlipCard
            icon="🎓"
            title="Education"
            subtitle="Foundation of growth"
            backContent={
              <>
                <h4>New York University</h4>
                <p><strong>BS Computer Engineering, Minor in Psychology</strong></p>
                <p>I graduated from NYU Tandon in 2023. During my time there, I was Lead TA for Computer Architecture, helping 160 students while coordinating 7 other TAs. Before NYU, I was valedictorian at St. Anthony's Secondary School in Antigua, where I earned my AS in Mathematics.</p>
              </>
            }
          />

          <FlipCard
            icon="♟️"
            title="Chess"
            subtitle="Strategic thinking"
            backContent={
              <>
                <h4>National Champion</h4>
                <p><strong>Antigua and Barbuda, 2018</strong></p>
                <p>I learned chess when I was 12 and became the national champion of Antigua and Barbuda in 2018. I represented my country at the Batumi World Chess Olympiad that same year as the top performing team member. These days I play casually online—you can find me on <a href="https://www.chess.com/member/krisaska1412" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{color: '#6366f1', textDecoration: 'underline'}}>chess.com as KrisAska1412</a>.</p>
              </>
            }
          />

          <FlipCard
            icon="❤️"
            title="Philanthropy"
            subtitle="Giving back home"
            backContent={
              <>
                <h4>Annual Aska Award</h4>
                <p><strong>Villa Primary School | Established 2024</strong></p>
                <p>I established a $1,000 annual scholarship at Villa Primary School in Antigua in 2024. It's the same school where I volunteered from 2016-2018, teaching and mentoring students. Giving back to the community that shaped me is important—it's my way of keeping the door open for the next generation.</p>
              </>
            }
          />
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo pathname="/" />

export default IndexPage
