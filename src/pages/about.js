import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import {
  aboutContainer,
  profileImage,
  aboutText,
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
          <p> I am Jerry Aska, from Antigua. I grew up in the Point and Villa Community, and was fortunate to have a loving family and a supportive church, the Bible Speaks Seventh Day Adventist church. </p>
          <p> Education played a significant role in my life. I first attended the Kids Unlimited School for primary education, then went on to graduated with an Associates Degree in Mathematics from St. Anthony's Secondary School. While a secondary school student, I discovered a passion for teaching and began sharing knowledge with those around me through study sessions and volunteer classes at my church and local primary school. These experiences would eventually help me secure a one year tenure as a full time teacher at my alma mater as I prepared for university. I enjoyed being able to work with my students and help the mold themselves into the persons they wanted to become. </p>
          <p> As a teacher, I noticed that even though I was a role model for my students, I hadn’t yet discovered the role I wanted to play in life. I built a desire for new experiences and to find my purpose. I wanted to pursue further education somewhere that would expose me to new peoples and experiences. And thus, I pursued a Bachelor of Science in Computer Engineering at New York University's Tandon School of Engineering. This helped me not only build my technical and communication skills but also helped expand my world view and build communities that I will cherish for a lift time. While at NYU I did not forget about my passion for teaching and by my junior year, I found myself became the lead teaching assistant for Computer Architecture and Design. As lead I took great care over my students and developed supplemental materials to assist them. </p>
          <p> Outside of academics, chess has been a beloved pursuit of mine since my high school days. I first learnt how to play when I was 12, and at my peak I became the national champion of Antigua and Barbuda in 2018 and represented the country at the Batumi World Chess Olympiad that same year. Despite the team’s overall performance, I showcased my dedication and skill being the top performing member of my team. </p>
          <p> Looking ahead, my goals are two-fold. Personally, I am committed to giving back to Antigua and Barbuda, a place that has shaped me profoundly. Professionally, I aspire to reach the pinnacle of the corporate world as a C Suite Officer, making a positive impact through leadership, integrity, and innovation. </p>
          <p> As I move forward, I carry with me the lessons learned, the experiences gained, and a burning passion to make a difference. My journey continues, and I am ready to leave an indelible mark on the world. </p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="About Me" />

export default AboutPage
