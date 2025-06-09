#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying vCFO of One Visual Setup...\n');

const checks = [];
let errors = [];

// Helper function to check if file exists
function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  checks.push({
    name: description,
    path: filePath,
    status: exists ? '✅' : '❌',
    exists
  });
  if (!exists) {
    errors.push(`Missing: ${filePath}`);
  }
  return exists;
}

// Helper function to check file content
function checkFileContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const found = content.includes(searchString);
    checks.push({
      name: description,
      path: filePath,
      status: found ? '✅' : '⚠️',
      exists: true,
      contentCheck: !found
    });
    if (!found) {
      errors.push(`Missing content in ${filePath}: ${searchString}`);
    }
    return found;
  }
  return false;
}

console.log('📁 Checking Core Files...');
// Design System
checkFile('frontend/src/styles/design-system.ts', 'Design System');
checkFile('frontend/tailwind.config.js', 'Tailwind Configuration');
checkFile('frontend/postcss.config.js', 'PostCSS Configuration');
checkFile('frontend/src/app/globals.css', 'Global CSS');

console.log('\n🎨 Checking Components...');
// UI Components
checkFile('frontend/src/components/ui/Button.tsx', 'Button Component');
checkFile('frontend/src/components/ui/Card.tsx', 'Card Component');
checkFile('frontend/src/components/ui/Input.tsx', 'Input Component');
checkFile('frontend/src/components/ui/Container.tsx', 'Container Component');
checkFile('frontend/src/components/ui/index.ts', 'UI Components Index');

// Dashboard Components
checkFile('frontend/src/components/dashboard/MetricCard.tsx', 'Metric Card');
checkFile('frontend/src/components/dashboard/ChartCard.tsx', 'Chart Card');
checkFile('frontend/src/components/dashboard/SimpleBarChart.tsx', 'Simple Bar Chart');

console.log('\n📄 Checking Pages...');
// Pages
checkFile('frontend/src/app/page.tsx', 'Landing Page');
checkFile('frontend/src/app/dashboard/page.tsx', 'Dashboard Preview');
checkFile('frontend/src/app/layout.tsx', 'Root Layout');

console.log('\n🎨 Checking Visual Consistency...');
// Color Scheme
checkFileContent('frontend/src/styles/design-system.ts', '#4169E1', 'Primary Color (Utlyze Blue)');
checkFileContent('frontend/src/styles/design-system.ts', '#00A878', 'Accent Color (Success Green)');
checkFileContent('frontend/tailwind.config.js', '#4169E1', 'Tailwind Primary Color');
checkFileContent('frontend/tailwind.config.js', '#00A878', 'Tailwind Accent Color');

// Animations
checkFileContent('frontend/tailwind.config.js', 'animation:', 'Animation Configuration');
checkFileContent('frontend/tailwind.config.js', 'keyframes:', 'Keyframes Configuration');
checkFileContent('frontend/src/app/globals.css', 'animation-delay', 'Animation Delay Utilities');

// Typography
checkFileContent('frontend/src/styles/design-system.ts', 'Inter', 'Inter Font Family');
checkFileContent('frontend/src/app/layout.tsx', 'Inter', 'Inter Font Import');

console.log('\n🔧 Checking Configuration...');
// Build Configuration
checkFile('frontend/package.json', 'Package.json');
checkFile('frontend/tsconfig.json', 'TypeScript Config');
checkFile('frontend/next.config.js', 'Next.js Config');

// Environment
checkFile('frontend/.env.local.example', 'Environment Variables Example');

console.log('\n📊 Verification Results:\n');

// Display results
checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  if (check.contentCheck) {
    console.log(`   ⚠️  Content check failed`);
  }
});

// Summary
const totalChecks = checks.length;
const passedChecks = checks.filter(c => c.status === '✅').length;
const warningChecks = checks.filter(c => c.status === '⚠️').length;
const failedChecks = checks.filter(c => c.status === '❌').length;

console.log('\n📈 Summary:');
console.log(`   Total checks: ${totalChecks}`);
console.log(`   ✅ Passed: ${passedChecks}`);
console.log(`   ⚠️  Warnings: ${warningChecks}`);
console.log(`   ❌ Failed: ${failedChecks}`);

// Recommendations
if (errors.length > 0) {
  console.log('\n⚠️  Issues Found:');
  errors.forEach(error => console.log(`   - ${error}`));
  
  console.log('\n💡 Recommendations:');
  if (errors.some(e => e.includes('.env'))) {
    console.log('   - Copy .env.local.example to .env.local and fill in values');
  }
  if (errors.some(e => e.includes('Missing:'))) {
    console.log('   - Run the agent-orchestrator.js to create missing files');
  }
  if (errors.some(e => e.includes('content'))) {
    console.log('   - Review files with content warnings to ensure proper implementation');
  }
} else {
  console.log('\n✅ All visual aspects are properly configured!');
  console.log('\n🚀 Next Steps:');
  console.log('   1. Run "npm run dev" to start the development server');
  console.log('   2. Visit http://localhost:3000 to view the site');
  console.log('   3. Check /dashboard for the dashboard preview');
  console.log('   4. Test responsive design on different screen sizes');
}

process.exit(errors.length > 0 ? 1 : 0);