#!/usr/bin/env node

/**
 * Simple Lighthouse performance baseline script
 * Run with: npm run lighthouse
 *
 * This script runs Lighthouse against your local build and saves
 * the scores to lighthouse-scores.json for tracking over time.
 */

import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import fs from 'fs'

const URL = 'http://localhost:9000' // Gatsby serve default port
const OUTPUT_FILE = 'benchmarks/lighthouse-scores.json'
const REPORT_DIR = 'benchmarks/lighthouse-reports'
const generateFullReport = true // Always generate HTML reports

async function runLighthouseTest(formFactor, chrome) {
  const options = {
    logLevel: 'error',
    output: generateFullReport ? ['json', 'html'] : ['json'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: formFactor,
    screenEmulation: formFactor === 'mobile'
      ? { mobile: true, width: 375, height: 667, deviceScaleFactor: 2 }
      : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 },
    port: chrome.port,
  }

  const runnerResult = await lighthouse(URL, options)
  const { categories } = runnerResult.lhr

  // Save HTML report if requested
  if (generateFullReport && runnerResult.report[1]) {
    if (!fs.existsSync(REPORT_DIR)) {
      fs.mkdirSync(REPORT_DIR, { recursive: true })
    }
    const reportPath = `${REPORT_DIR}/lighthouse-${formFactor}.html`
    fs.writeFileSync(reportPath, runnerResult.report[1])
    console.log(`   📄 Full report saved: ${reportPath}`)
  }

  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
  }
}

async function runLighthouse() {
  console.log('🚀 Launching Chrome...')
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })

  // Run desktop test
  console.log(`\n📊 Running Lighthouse (Desktop) on ${URL}...`)
  const desktopScores = await runLighthouseTest('desktop', chrome)

  // Run mobile test
  console.log(`📱 Running Lighthouse (Mobile) on ${URL}...`)
  const mobileScores = await runLighthouseTest('mobile', chrome)

  await chrome.kill()

  const scores = {
    timestamp: new Date().toISOString(),
    desktop: desktopScores,
    mobile: mobileScores,
  }

  console.log('\n✨ Lighthouse Scores:')
  console.log('\n   Desktop:')
  console.log(`     Performance:    ${desktopScores.performance}`)
  console.log(`     Accessibility:  ${desktopScores.accessibility}`)
  console.log(`     Best Practices: ${desktopScores.bestPractices}`)
  console.log(`     SEO:            ${desktopScores.seo}`)
  console.log('\n   Mobile:')
  console.log(`     Performance:    ${mobileScores.performance}`)
  console.log(`     Accessibility:  ${mobileScores.accessibility}`)
  console.log(`     Best Practices: ${mobileScores.bestPractices}`)
  console.log(`     SEO:            ${mobileScores.seo}`)

  // Load previous score for comparison
  let previousScore = null
  if (fs.existsSync(OUTPUT_FILE)) {
    previousScore = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'))
  }

  // Save current scores (overwrites previous)
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(scores, null, 2))
  console.log(`\n💾 Scores saved to ${OUTPUT_FILE}`)

  // Show trend if we have previous data
  if (previousScore && previousScore.desktop) {
    const desktopDiff = scores.desktop.performance - previousScore.desktop.performance
    const mobileDiff = scores.mobile.performance - previousScore.mobile.performance
    const desktopTrend = desktopDiff > 0 ? '📈' : desktopDiff < 0 ? '📉' : '➡️'
    const mobileTrend = mobileDiff > 0 ? '📈' : mobileDiff < 0 ? '📉' : '➡️'
    console.log(`\n${desktopTrend} Desktop performance change: ${desktopDiff > 0 ? '+' : ''}${desktopDiff} points`)
    console.log(`${mobileTrend} Mobile performance change: ${mobileDiff > 0 ? '+' : ''}${mobileDiff} points`)
  }
}

runLighthouse().catch((err) => {
  console.error('❌ Error running Lighthouse:', err)
  process.exit(1)
})
