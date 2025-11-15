import * as React from 'react'
import { useState } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
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
  card,
  cardInner,
  cardFlipped,
  cardFront,
  cardBack,
  cardIcon,
  cardTitle,
  cardSubtitle,
  cardContent,
} from './index.module.css'

const FlipCard = ({ icon, title, subtitle, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`${card} ${isFlipped ? cardFlipped : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
    >
      <div className={cardInner}>
        <div className={cardFront}>
          <div className={cardIcon}>{icon}</div>
          <h3 className={cardTitle}>{title}</h3>
          <p className={cardSubtitle}>{subtitle}</p>
        </div>
        <div className={cardBack}>
          <div className={cardContent}>
            {backContent}
          </div>
        </div>
      </div>
    </div>
  )
}

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
          I'm a Software Development Engineer at AWS Wickr.
        </p>
        <p>
          My journey from teaching in Antigua to engineering in New York has
          shaped my commitment to education, technology, and giving back to my
          community.
          Whether it's through code, mentorship, or supporting the next
          generation of Antiguan students, I believe in using my skills to
          make a meaningful impact.
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
                <p><strong>AWS Wickr | July 2023 - Present</strong></p>
                <p>I'm a Software Development Engineer at AWS Wickr, where I focus on backend systems and improving the stability of our Kubernetes infrastructure. Beyond the code, I've become the unofficial social chair for our office—because building great software is easier when the team actually enjoys working together.</p>
                <p><Link to="/resume" onClick={(e) => e.stopPropagation()} style={{color: '#6366f1', textDecoration: 'underline', fontWeight: '600'}}>View Full Resume →</Link></p>
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
                <h4>Villa School Scholarship</h4>
                <p><strong>Annual $1,000 USD Award | Established 2024</strong></p>
                <p>I established an annual $1,000 scholarship at Villa Primary School in Antigua in 2024. It's the same school where I volunteered from 2016-2018, teaching and mentoring students. Giving back to the community that shaped me is important—it's my way of keeping the door open for the next generation.</p>
              </>
            }
          />
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
