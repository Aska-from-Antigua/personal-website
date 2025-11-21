#!/usr/bin/env node

/**
 * Bundle size tracking
 * Measures total JS and CSS bundle sizes
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '../public')
const OUTPUT_FILE = 'benchmarks/bundle-sizes.json'

function getDirectorySize(dir, extensions) {
  let totalSize = 0

  function walk(currentPath) {
    const files = fs.readdirSync(currentPath)

    files.forEach(file => {
      const filePath = path.join(currentPath, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        walk(filePath)
      } else if (extensions.some(ext => file.endsWith(ext))) {
        totalSize += stat.size
      }
    })
  }

  walk(dir)
  return totalSize
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB'
}

const jsSize = getDirectorySize(publicDir, ['.js'])
const cssSize = getDirectorySize(publicDir, ['.css'])
const totalSize = jsSize + cssSize

const sizes = {
  timestamp: new Date().toISOString(),
  javascript: jsSize,
  css: cssSize,
  total: totalSize,
}

console.log('\n📦 Bundle Sizes:')
console.log(`   JavaScript: ${formatBytes(jsSize)}`)
console.log(`   CSS:        ${formatBytes(cssSize)}`)
console.log(`   Total:      ${formatBytes(totalSize)}`)

// Load previous sizes
let previousSizes = null
if (fs.existsSync(OUTPUT_FILE)) {
  previousSizes = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'))
}

// Save current sizes
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sizes, null, 2))
console.log(`\n💾 Sizes saved to ${OUTPUT_FILE}`)

// Show trend
if (previousSizes) {
  const diff = totalSize - previousSizes.total
  const diffKB = (diff / 1024).toFixed(2)
  const trend = diff > 0 ? '📈' : diff < 0 ? '📉' : '➡️'
  console.log(`${trend} Bundle size change: ${diff > 0 ? '+' : ''}${diffKB} KB`)
}
