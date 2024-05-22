import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

export function Dino() {
  return (
    <StaticImage
      src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
      alt="A dinosaur"
      placeholder="blurred"
      layout="fixed"
      width={200}
      height={200}
    />
  )
}

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <Dino />
    </Layout>
  )
}

export const Head = () => <title>Home Page</title>

export default IndexPage
