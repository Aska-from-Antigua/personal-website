const axios = require('axios')
const cheerio = require('cheerio')
const mediaLinks = require('./src/data/mediaLinks')

async function fetchMetadata(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      },
      timeout: 10000
    })

    const $ = cheerio.load(data)

    return {
      title: $('meta[property="og:title"]').attr('content') ||
             $('meta[name="twitter:title"]').attr('content') ||
             $('title').text() ||
             'No title',
      description: $('meta[property="og:description"]').attr('content') ||
                   $('meta[name="twitter:description"]').attr('content') ||
                   $('meta[name="description"]').attr('content') ||
                   '',
      image: $('meta[property="og:image"]').attr('content') ||
             $('meta[name="twitter:image"]').attr('content') ||
             '',
      siteName: $('meta[property="og:site_name"]').attr('content') ||
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
