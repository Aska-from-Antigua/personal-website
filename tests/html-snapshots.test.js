/**
 * HTML Snapshot Tests
 *
 * These tests capture the rendered HTML output of your pages
 * and track changes over time. If the HTML structure changes
 * unexpectedly, the test will fail.
 */

const fs = require('fs')
const path = require('path')

// Pages to snapshot
const PAGES = [
  'index.html',
  '404.html',
  'about/index.html',
  'resume/index.html',
  'media/index.html',
]

/**
 * Normalize HTML by removing dynamic content that changes between builds
 */
function normalizeHTML(html) {
  return html
    // Remove webpack hashes from script/style filenames
    .replace(/\/([\w-]+)-[a-f0-9]{20}\.(js|css)/g, '/$1-HASH.$2')
    // Remove timestamps
    .replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g, 'TIMESTAMP')
    // Remove build-specific IDs
    .replace(/data-gatsby-[^=]+=["'][^"']*["']/g, 'data-gatsby-REMOVED')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

describe('HTML Snapshots', () => {
  const publicDir = path.join(__dirname, '../public')

  // Check that build exists
  beforeAll(() => {
    if (!fs.existsSync(publicDir)) {
      throw new Error('Public directory not found. Run `npm run build` first.')
    }
  })

  PAGES.forEach((page) => {
    test(`${page} matches snapshot`, () => {
      const filePath = path.join(publicDir, page)

      if (!fs.existsSync(filePath)) {
        throw new Error(`Page not found: ${page}`)
      }

      const html = fs.readFileSync(filePath, 'utf8')
      const normalized = normalizeHTML(html)

      expect(normalized).toMatchSnapshot()
    })
  })

  // Test that critical content exists
  test('index.html contains hero section', () => {
    const html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8')
    expect(html).toContain('Jerry Aska')
    expect(html).toContain('Software Development Engineer')
  })

  test('about page contains content', () => {
    const html = fs.readFileSync(path.join(publicDir, 'about/index.html'), 'utf8')
    expect(html).toContain('About')
  })

  test('all pages have canonical links', () => {
    PAGES.forEach((page) => {
      const html = fs.readFileSync(path.join(publicDir, page), 'utf8')
      expect(html).toMatch(/<link[^>]*rel="canonical"/)
    })
  })

  test('all pages have meta descriptions', () => {
    PAGES.forEach((page) => {
      const html = fs.readFileSync(path.join(publicDir, page), 'utf8')
      expect(html).toMatch(/<meta[^>]*name="description"/)
    })
  })
})
