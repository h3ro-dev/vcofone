#!/usr/bin/env node

/**
 * vCFO of One - Automated Vercel Deployment Script
 * 
 * This script automates:
 * 1. Building the frontend
 * 2. Deploying to Vercel
 * 3. Setting up domain configuration
 * 4. Configuring DNS records
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  domain: 'vcofone.ai',
  subdomain: 'www.vcofone.ai',
  projectName: 'vcofone',
  frontendDir: 'frontend',
  vercelConfigPath: 'vercel.json'
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n🔄 ${description}...`, 'blue');
  try {
    const result = execSync(command, { 
      stdio: 'inherit', 
      cwd: process.cwd() 
    });
    log(`✅ ${description} completed!`, 'green');
    return result;
  } catch (error) {
    log(`❌ Error during: ${description}`, 'red');
    throw error;
  }
}

function createVercelProject() {
  log('\n📋 VERCEL PROJECT SETUP', 'bold');
  
  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    log('✅ Vercel CLI found', 'green');
  } catch (error) {
    log('❌ Vercel CLI not found. Installing...', 'yellow');
    runCommand('npm install -g vercel', 'Installing Vercel CLI');
  }
  
  // Login to Vercel (if not already logged in)
  try {
    execSync('vercel whoami', { stdio: 'ignore' });
    log('✅ Already logged into Vercel', 'green');
  } catch (error) {
    log('🔐 Please log into Vercel...', 'yellow');
    runCommand('vercel login', 'Logging into Vercel');
  }
}

function buildFrontend() {
  log('\n🏗️  BUILDING FRONTEND', 'bold');
  
  process.chdir(CONFIG.frontendDir);
  
  // Install dependencies
  runCommand('npm install --legacy-peer-deps', 'Installing dependencies');
  
  // Build the project
  runCommand('npm run build', 'Building Next.js project');
  
  // Go back to root
  process.chdir('..');
}

function deployToVercel() {
  log('\n🚀 DEPLOYING TO VERCEL', 'bold');
  
  // Deploy to Vercel
  runCommand('vercel --prod', 'Deploying to production');
  
  log('✅ Deployment completed!', 'green');
}

function setupDomain() {
  log('\n🌐 DOMAIN CONFIGURATION', 'bold');
  
  log('Setting up domain on Vercel...', 'blue');
  
  try {
    // Add domain to Vercel project
    runCommand(`vercel domains add ${CONFIG.domain}`, `Adding ${CONFIG.domain} to Vercel`);
    runCommand(`vercel domains add ${CONFIG.subdomain}`, `Adding ${CONFIG.subdomain} to Vercel`);
  } catch (error) {
    log('⚠️  Domain may already be added or requires verification', 'yellow');
  }
  
  // Get DNS configuration
  log('\n📋 DNS CONFIGURATION NEEDED:', 'bold');
  log('Please update your GoDaddy DNS settings with these records:', 'yellow');
  log('', 'reset');
  log('A Record:', 'bold');
  log('  Name: @', 'reset');
  log('  Value: 76.76.19.61', 'reset');
  log('', 'reset');
  log('CNAME Record:', 'bold');
  log('  Name: www', 'reset');
  log('  Value: vcofone.ai', 'reset');
  log('', 'reset');
  log('TXT Record (for verification):', 'bold');
  log('  Name: @', 'reset');
  log('  Value: (Vercel will provide this - check Vercel dashboard)', 'reset');
}

function createGoDaddyInstructions() {
  const instructions = `
# GoDaddy DNS Setup Instructions for vcofone.ai

## Step 1: Access GoDaddy DNS Management
1. Log into your GoDaddy account
2. Go to "My Products" 
3. Find vcofone.ai and click "DNS"

## Step 2: Update DNS Records

### Delete existing records (if any):
- Delete any existing A records pointing to @
- Delete any existing CNAME records for www

### Add new records:

**A Record:**
- Type: A
- Name: @
- Value: 76.76.19.61
- TTL: 600 (or default)

**CNAME Record:**
- Type: CNAME  
- Name: www
- Value: vcofone.ai
- TTL: 600 (or default)

**TXT Record (for Vercel verification):**
- Type: TXT
- Name: @
- Value: [Get this from Vercel dashboard after deployment]
- TTL: 600 (or default)

## Step 3: Verify Setup
1. Go to your Vercel dashboard
2. Navigate to your vcofone project
3. Click "Domains" tab
4. Add vcofone.ai and www.vcofone.ai
5. Follow verification steps

## Step 4: Test
- Wait 5-15 minutes for DNS propagation
- Test: https://vcofone.ai
- Test: https://www.vcofone.ai (should redirect to vcofone.ai)

## Troubleshooting
- DNS changes can take up to 48 hours to fully propagate
- Use https://www.whatsmydns.net to check propagation
- Contact Vercel support if verification fails
`;

  fs.writeFileSync('GODADDY_DNS_SETUP.md', instructions);
  log('📝 Created GODADDY_DNS_SETUP.md with detailed instructions', 'green');
}

function main() {
  log('🚀 vCFO of One - Automated Vercel Deployment', 'bold');
  log('===============================================', 'bold');
  
  try {
    // Step 1: Setup Vercel project
    createVercelProject();
    
    // Step 2: Build frontend
    buildFrontend();
    
    // Step 3: Deploy to Vercel
    deployToVercel();
    
    // Step 4: Setup domain
    setupDomain();
    
    // Step 5: Create GoDaddy instructions
    createGoDaddyInstructions();
    
    log('\n🎉 DEPLOYMENT COMPLETE!', 'bold');
    log('===============================', 'bold');
    log(`Your vCFO of One site is now deployed!`, 'green');
    log(`Next steps:`, 'yellow');
    log(`1. Check the GODADDY_DNS_SETUP.md file for DNS configuration`, 'reset');
    log(`2. Update your GoDaddy DNS settings`, 'reset');
    log(`3. Wait 5-15 minutes for DNS propagation`, 'reset');
    log(`4. Visit https://${CONFIG.domain} to see your live site!`, 'reset');
    
  } catch (error) {
    log(`\n❌ Deployment failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { CONFIG, setupDomain, createGoDaddyInstructions }; 