import * as React from 'react'
import Layout from '../components/layout'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </Layout>
  )
}

export const Head = () => <title>About Me</title>

export default AboutPage

// const AboutPage = () => {
//   return (
//     <main>
//       <h1>Jerry Aska</h1> (he/him)
//       <h2>Software Development Engineer, AWS Wickr</h2>
//       <p>As a dedicated Software Developer, my career is anchored in a passion for problem solving and fostering growth in myself and others. With a solid foundation in technical skills, I consistently leverage my expertise to enhance project outcomes and team capabilities.</p>
//       <p>My journey in tech began with roles that emphasized learning and teaching, where I excelled as a Teaching Assistant ion various roles and subjects. These experiences have sharpened my foundational knowledge, raised my ability to uplift and educate peers, and reinforced my belief in collective growth.</p>
//       <p>In my current role as an SDE I at AWS Wickr, I am immersed in the dynamic realms of cloud infrastructure and security. This position has allowed me to learn and be curious under the direct mentorship of industry leaders and work backwards from customers to deliver strong results. The environment at AWS has been pivotal in refining my skills in real-world applications and staying at the forefront of technological advancements.</p>
//       <p>Looking ahead, I aspire to transition into a Software Development Manager role. I am eager to merge my dual passions for technical problem-solving and people development, guiding teams to think big, invent and simplify, and deliver results. My commitment is to not just advance my career but to also contribute to the success and growth of my colleagues.</p>
//       <p>I am on a mission to create, inspire, and lead in the tech space. If you share a vision for impactful solutions and professional growth, I warmly invite you to connect and explore how we can make a significant difference together.</p>
//       <Link to="/">Back to Home</Link>
//     </main>
//   )
// }

// export default AboutPage