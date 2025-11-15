import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {
  mediaContainer,
  mediaGrid,
  mediaCard,
  mediaImage,
  mediaContent,
  mediaTitle,
  mediaDescription,
  mediaSiteName,
} from './media.module.css'

const MediaPage = ({ data }) => {
  return (
    <Layout>
      <div className={mediaContainer}>
        <h1>Media & Features</h1>
        <p>Articles, posts, and mentions from around the web.</p>

        <div className={mediaGrid}>
          {data.allMediaLink.nodes.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={mediaCard}
            >
              {link.image && (
                <div className={mediaImage}>
                  <img src={link.image} alt={link.title} />
                </div>
              )}
              <div className={mediaContent}>
                {link.siteName && <p className={mediaSiteName}>{link.siteName}</p>}
                <h3 className={mediaTitle}>{link.title}</h3>
                {link.description && (
                  <p className={mediaDescription}>{link.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMediaLink {
      nodes {
        url
        title
        description
        image
        siteName
      }
    }
  }
`

export const Head = () => <Seo title="Media" />

export default MediaPage
