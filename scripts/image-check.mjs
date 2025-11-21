#!/usr/bin/env node

/**
 * Image optimization check
 * Verifies images are properly compressed and optimized
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '../public')
const staticDir = path.join(__dirname, '../static')

// Size thresholds (in KB)
const THRESHOLDS = {
  jpg: 200,  // JPG should be < 200KB
  png: 100,  // PNG should be < 100KB
  svg: 50,   // SVG should be < 50KB
  webp: 150, // WebP should be < 150KB
}

function checkImages(dir, issues = []) {
  if (!fs.existsSync(dir)) return issues

  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      checkImages(filePath, issues)
    } else {
      const ext = path.extname(file).toLowerCase().slice(1)
      if (['jpg', 'jpeg', 'png', 'svg', 'webp'].includes(ext)) {
        const sizeKB = stat.size / 1024
        const threshold = THRESHOLDS[ext === 'jpeg' ? 'jpg' : ext]

        if (threshold && sizeKB > threshold) {
          issues.push({
            file: path.relative(process.cwd(), filePath),
            size: sizeKB.toFixed(2),
            threshold,
            ext,
          })
        }
      }
    }
  })

  return issues
}

console.log('\n🖼️  Checking image optimization...')

const issues = [
  ...checkImages(publicDir),
  ...checkImages(staticDir),
]

if (issues.length > 0) {
  console.log(`   ⚠️  Found ${issues.length} image(s) that could be optimized:\n`)
  issues.forEach(issue => {
    console.log(`   ${issue.file}`)
    console.log(`     Size: ${issue.size} KB (threshold: ${issue.threshold} KB)\n`)
  })
} else {
  console.log('   ✅ All images are properly optimized!')
}


