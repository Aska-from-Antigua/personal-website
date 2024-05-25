import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import {
  heroSection,
  heroText,
  heroOverlay,
  heroImage,
} from './index.module.css'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home">
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
          <p>Innovative solutions for a digital world.</p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
