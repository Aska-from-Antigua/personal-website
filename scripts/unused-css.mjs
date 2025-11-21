#!/usr/bin/env node

/**
 * Unused CSS detection
 * Finds CSS selectors that aren't used in your HTML
 */

import { PurgeCSS } from 'purgecss'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '../public')

async function checkUnusedCSS() {

  // Find all CSS files
  const cssFiles = []
  function findCSS(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        findCSS(filePath)
      } else if (file.endsWith('.css')) {
        cssFiles.push(filePath)
      }
    })
  }
  findCSS(publicDir)

  if (cssFiles.length === 0) {
    return
  }

  // Find all HTML files
  const htmlFiles = []
  function findHTML(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        findHTML(filePath)
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath)
      }
    })
  }
  findHTML(publicDir)

  let totalOriginalSize = 0
  let totalPurgedSize = 0
  const fileResults = []

  for (const cssFile of cssFiles) {
    const originalCSS = fs.readFileSync(cssFile, 'utf8')
    const originalSize = Buffer.byteLength(originalCSS, 'utf8')
    totalOriginalSize += originalSize

    const purgeCSSResult = await new PurgeCSS().purge({
      content: htmlFiles,
      css: [cssFile],
      safelist: {
        // Keep these classes even if not found in HTML
        standard: [/^gatsby/, /^reach/, /^focus/, /^active/, /^hover/],
      },
    })

    const purgedSize = Buffer.byteLength(purgeCSSResult[0].css, 'utf8')
    totalPurgedSize += purgedSize

    const savings = originalSize - purgedSize
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1)

    fileResults.push({
      file: path.basename(cssFile),
      originalSize,
      purgedSize,
      savings,
      savingsPercent,
    })
  }

  const totalSavings = totalOriginalSize - totalPurgedSize
  const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1)

  console.log('\n🧹 Checking for unused CSS...')

  // Only output details if there are significant savings
  if (totalSavingsPercent > 5) {
    console.log(`   ⚠️  Found ${(totalSavings / 1024).toFixed(2)} KB of unused CSS (${totalSavingsPercent}% savings possible)\n`)

    fileResults.forEach(result => {
      console.log(`   ${result.file}`)
      console.log(`     Original: ${(result.originalSize / 1024).toFixed(2)} KB`)
      console.log(`     After purge: ${(result.purgedSize / 1024).toFixed(2)} KB`)
      console.log(`     Savings: ${(result.savings / 1024).toFixed(2)} KB (${result.savingsPercent}%)\n`)
    })

    if (totalSavingsPercent > 20) {
      console.log(`   💡 Consider adding PurgeCSS to your build process`)
    }
  } else {
    console.log('   ✅ CSS is well-optimized!')
  }
}

checkUnusedCSS().catch(err => {
  console.error('❌ Error checking CSS:', err)
  process.exit(1)
})
