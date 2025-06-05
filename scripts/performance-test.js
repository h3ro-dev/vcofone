#!/usr/bin/env node

/**
 * Performance Testing Script for vCFO Application
 * Measures bundle sizes, loading times, and web vitals
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  buildDir: path.join(__dirname, '../frontend/.next'),
  publicDir: path.join(__dirname, '../frontend/public'),
  thresholds: {
    bundleSize: {
      js: 244 * 1024, // 244KB per chunk
      css: 60 * 1024, // 60KB per CSS file
      total: 1024 * 1024, // 1MB total
    },
    webVitals: {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 },
    },
  },
};

// Utility functions
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getColorForSize(size, threshold) {
  if (size < threshold * 0.8) return '\x1b[32m'; // Green
  if (size < threshold) return '\x1b[33m'; // Yellow
  return '\x1b[31m'; // Red
}

function getColorForMetric(value, good, poor) {
  if (value <= good) return '\x1b[32m'; // Green
  if (value <= poor) return '\x1b[33m'; // Yellow
  return '\x1b[31m'; // Red
}

// Bundle size analysis
async function analyzeBundleSize() {
  console.log('\n📦 Analyzing Bundle Sizes...\n');

  try {
    // Get all JS and CSS files
    const jsFiles = [];
    const cssFiles = [];
    let totalSize = 0;

    function walkDir(dir) {
      if (!fs.existsSync(dir)) return;
      
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (file.endsWith('.js') && !file.includes('.map')) {
          const size = stat.size;
          jsFiles.push({ path: filePath, size });
          totalSize += size;
        } else if (file.endsWith('.css') && !file.includes('.map')) {
          const size = stat.size;
          cssFiles.push({ path: filePath, size });
          totalSize += size;
        }
      });
    }

    walkDir(CONFIG.buildDir);

    // Sort by size
    jsFiles.sort((a, b) => b.size - a.size);
    cssFiles.sort((a, b) => b.size - a.size);

    // Display JS bundles
    console.log('JavaScript Bundles:');
    jsFiles.slice(0, 10).forEach(file => {
      const color = getColorForSize(file.size, CONFIG.thresholds.bundleSize.js);
      const reset = '\x1b[0m';
      const name = path.basename(file.path);
      console.log(`  ${color}${name.padEnd(40)} ${formatBytes(file.size)}${reset}`);
    });

    // Display CSS files
    if (cssFiles.length > 0) {
      console.log('\nCSS Files:');
      cssFiles.forEach(file => {
        const color = getColorForSize(file.size, CONFIG.thresholds.bundleSize.css);
        const reset = '\x1b[0m';
        const name = path.basename(file.path);
        console.log(`  ${color}${name.padEnd(40)} ${formatBytes(file.size)}${reset}`);
      });
    }

    // Total size
    const totalColor = getColorForSize(totalSize, CONFIG.thresholds.bundleSize.total);
    const reset = '\x1b[0m';
    console.log(`\n${totalColor}Total Bundle Size: ${formatBytes(totalSize)}${reset}`);

    return {
      jsFiles: jsFiles.length,
      cssFiles: cssFiles.length,
      totalSize,
    };
  } catch (error) {
    console.error('Error analyzing bundle size:', error.message);
    return null;
  }
}

// Lighthouse performance test
async function runLighthouseTest(url = 'http://localhost:3000') {
  console.log('\n🏃 Running Lighthouse Performance Test...\n');

  try {
    const { stdout } = await execAsync(
      `npx lighthouse ${url} --only-categories=performance --output=json --quiet`
    );

    const results = JSON.parse(stdout);
    const metrics = results.audits;

    // Extract key metrics
    const webVitals = {
      lcp: metrics['largest-contentful-paint']?.numericValue || 0,
      fid: metrics['max-potential-fid']?.numericValue || 0,
      cls: metrics['cumulative-layout-shift']?.numericValue || 0,
      fcp: metrics['first-contentful-paint']?.numericValue || 0,
      ttfb: metrics['server-response-time']?.numericValue || 0,
    };

    // Display results
    console.log('Web Vitals:');
    Object.entries(webVitals).forEach(([metric, value]) => {
      const threshold = CONFIG.thresholds.webVitals[metric];
      const color = getColorForMetric(value, threshold.good, threshold.poor);
      const reset = '\x1b[0m';
      const metricName = metric.toUpperCase().padEnd(5);
      const displayValue = metric === 'cls' ? value.toFixed(3) : `${Math.round(value)}ms`;
      console.log(`  ${color}${metricName} ${displayValue}${reset}`);
    });

    // Performance score
    const score = Math.round(results.categories.performance.score * 100);
    const scoreColor = score >= 90 ? '\x1b[32m' : score >= 50 ? '\x1b[33m' : '\x1b[31m';
    console.log(`\n${scoreColor}Performance Score: ${score}/100\x1b[0m`);

    return { webVitals, score };
  } catch (error) {
    console.error('Error running Lighthouse test:', error.message);
    console.log('Make sure the application is running on', url);
    return null;
  }
}

// Check for performance anti-patterns
async function checkAntiPatterns() {
  console.log('\n🔍 Checking for Performance Anti-patterns...\n');

  const issues = [];

  // Check for large images
  function checkImages(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        checkImages(filePath);
      } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
        const size = stat.size;
        if (size > 200 * 1024) { // 200KB
          issues.push({
            type: 'Large Image',
            file: path.relative(CONFIG.publicDir, filePath),
            size: formatBytes(size),
            suggestion: 'Consider using WebP/AVIF format or reducing image size',
          });
        }
      }
    });
  }

  checkImages(CONFIG.publicDir);

  // Check for missing optimizations in code
  const srcDir = path.join(__dirname, '../frontend/src');
  
  function checkCode(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        checkCode(filePath);
      } else if (/\.(tsx?|jsx?)$/.test(file)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for missing React.memo
        if (content.includes('export function') && !content.includes('memo')) {
          const componentCount = (content.match(/export function/g) || []).length;
          if (componentCount > 0) {
            issues.push({
              type: 'Missing Memoization',
              file: path.relative(srcDir, filePath),
              suggestion: 'Consider using React.memo for pure components',
            });
          }
        }

        // Check for inline functions in render
        if (content.includes('onClick={() =>') || content.includes('onChange={() =>')) {
          issues.push({
            type: 'Inline Functions',
            file: path.relative(srcDir, filePath),
            suggestion: 'Use useCallback to memoize event handlers',
          });
        }
      }
    });
  }

  checkCode(srcDir);

  // Display issues
  if (issues.length > 0) {
    console.log(`Found ${issues.length} potential performance issues:\n`);
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.type}`);
      console.log(`   File: ${issue.file}`);
      if (issue.size) console.log(`   Size: ${issue.size}`);
      console.log(`   ⚡ ${issue.suggestion}\n`);
    });
  } else {
    console.log('✅ No major performance anti-patterns detected!');
  }

  return issues;
}

// Generate performance report
async function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    bundleAnalysis: results.bundle,
    webVitals: results.lighthouse?.webVitals,
    performanceScore: results.lighthouse?.score,
    antiPatterns: results.antiPatterns?.length || 0,
    recommendations: [],
  };

  // Generate recommendations
  if (results.bundle) {
    if (results.bundle.totalSize > CONFIG.thresholds.bundleSize.total) {
      report.recommendations.push(
        'Consider code splitting to reduce bundle size'
      );
    }
  }

  if (results.lighthouse) {
    const { webVitals } = results.lighthouse;
    if (webVitals.lcp > CONFIG.thresholds.webVitals.lcp.good) {
      report.recommendations.push(
        'Optimize Largest Contentful Paint by preloading critical resources'
      );
    }
    if (webVitals.cls > CONFIG.thresholds.webVitals.cls.good) {
      report.recommendations.push(
        'Reduce Cumulative Layout Shift by specifying image dimensions'
      );
    }
  }

  // Save report
  const reportPath = path.join(__dirname, '../performance-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📊 Performance report saved to: ${reportPath}`);

  return report;
}

// Main execution
async function main() {
  console.log('🚀 vCFO Performance Test Suite\n');
  console.log('=' .repeat(50));

  const results = {};

  // 1. Bundle size analysis
  results.bundle = await analyzeBundleSize();

  // 2. Lighthouse test (if app is running)
  results.lighthouse = await runLighthouseTest();

  // 3. Anti-pattern detection
  results.antiPatterns = await checkAntiPatterns();

  // 4. Generate report
  const report = await generateReport(results);

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('\n📈 Performance Test Summary:\n');
  
  if (results.bundle) {
    console.log(`✅ Analyzed ${results.bundle.jsFiles} JS files and ${results.bundle.cssFiles} CSS files`);
  }
  
  if (results.lighthouse) {
    console.log(`✅ Performance score: ${results.lighthouse.score}/100`);
  }
  
  if (results.antiPatterns) {
    console.log(`⚠️  Found ${results.antiPatterns.length} potential improvements`);
  }

  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }

  console.log('\n✨ Performance test completed!\n');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { analyzeBundleSize, runLighthouseTest, checkAntiPatterns };