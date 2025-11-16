import * as React from 'react'
import { useState } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {
  notFoundContainer,
  notFoundContent,
  notFoundTitle,
  notFoundText,
} from './404.module.css'

const NotFoundPage = () => {
  const [catKey, setCatKey] = useState(0)

  const getNewCat = () => {
    setCatKey(prev => prev + 1)
  }

  return (
    <Layout>
      <div className={notFoundContainer}>
        <div className={notFoundContent}>
          <h1 className={notFoundTitle}>404</h1>
          <p className={notFoundText}>
            Alas! The page thou seekest hath vanished into the digital abyss.
          </p>
          <p className={notFoundText}>
            Pray, accept this feline offering as recompense for thy troubles. 🐱
          </p>
          <div
            onClick={getNewCat}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              margin: '2rem auto 0',
              cursor: 'pointer',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid rgba(99, 102, 241, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            <img
              src={`https://cataas.com/cat?width=400&height=400&t=${catKey}`}
              alt="Random cat"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1rem',
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '500',
              textAlign: 'center',
            }}>
              Click for a new cat →
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Page Not Found" />

export default NotFoundPage
