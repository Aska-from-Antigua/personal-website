const axios = require('axios')
const { parse } = require('node-html-parser')
const mediaLinks = require('./src/data/mediaLinks')

async function fetchMetadata(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      },
      timeout: 10000
    })

    const root = parse(data)

    const getMetaContent = (property, name) => {
      const metaProperty = root.querySelector(`meta[property="${property}"]`)
      const metaName = root.querySelector(`meta[name="${name}"]`)
      return metaProperty?.getAttribute('content') || metaName?.getAttribute('content') || ''
    }

    return {
      title: getMetaContent('og:title', 'twitter:title') ||
             root.querySelector('title')?.text ||
             'No title',
      description: getMetaContent('og:description', 'twitter:description') ||
                   getMetaContent('description', 'description') ||
                   '',
      image: getMetaContent('og:image', 'twitter:image') || '',
      siteName: getMetaContent('og:site_name', 'og:site_name') ||
                new URL(url).hostname ||
                '',
    }
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error.message)
    return null
  }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  for (const url of mediaLinks) {
    const metadata = await fetchMetadata(url)

    if (metadata) {
      const nodeData = {
        url,
        ...metadata,
      }

      createNode({
        ...nodeData,
        id: createNodeId(`media-link-${url}`),
        internal: {
          type: 'MediaLink',
          contentDigest: createContentDigest(nodeData),
        },
      })
    }
  }
}
