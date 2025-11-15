const ogs = require('open-graph-scraper')
const mediaLinks = require('./src/data/mediaLinks')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  for (const url of mediaLinks) {
    try {
      const { result } = await ogs({ url })

      const nodeData = {
        url,
        title: result.ogTitle || result.twitterTitle || 'No title',
        description: result.ogDescription || result.twitterDescription || '',
        image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '',
        siteName: result.ogSiteName || '',
      }

      createNode({
        ...nodeData,
        id: createNodeId(`media-link-${url}`),
        internal: {
          type: 'MediaLink',
          contentDigest: createContentDigest(nodeData),
        },
      })
    } catch (error) {
      console.error(`Error fetching metadata for ${url}:`, error)
    }
  }
}
