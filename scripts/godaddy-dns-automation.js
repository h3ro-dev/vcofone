#!/usr/bin/env node

/**
 * GoDaddy DNS Automation Helper for vCFO of One
 * 
 * This script helps automate DNS setup by:
 * 1. Generating the exact DNS records needed
 * 2. Providing copy-paste ready values
 * 3. Opening GoDaddy DNS management directly
 * 4. Checking DNS propagation status
 */

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

// Configuration
const CONFIG = {
  domain: 'vcofone.ai',
  vercelIP: '76.76.19.61', // Vercel's IP for A records
  godaddyLoginUrl: 'https://sso.godaddy.com/login',
  godaddyDnsUrl: 'https://dns.godaddy.com',
  checkDnsUrl: 'https://www.whatsmydns.net/#A/vcofone.ai'
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function openBrowser(url) {
  const platform = process.platform;
  let command;
  
  if (platform === 'darwin') command = 'open';
  else if (platform === 'win32') command = 'start';
  else command = 'xdg-open';
  
  try {
    execSync(`${command} "${url}"`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function checkDnsStatus(domain) {
  return new Promise((resolve) => {
    const req = https.get(`https://dns.google/resolve?name=${domain}&type=A`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          const hasRecords = response.Answer && response.Answer.length > 0;
          resolve(hasRecords);
        } catch (error) {
          resolve(false);
        }
      });
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => resolve(false));
  });
}

function generateDnsRecords() {
  log('\n📋 DNS RECORDS FOR GODADDY', 'bold');
  log('================================', 'bold');
  
  const records = [
    {
      type: 'A',
      name: '@',
      value: CONFIG.vercelIP,
      ttl: '600',
      description: 'Points root domain to Vercel'
    },
    {
      type: 'CNAME',
      name: 'www',
      value: CONFIG.domain,
      ttl: '600', 
      description: 'Redirects www to root domain'
    }
  ];
  
  records.forEach((record, index) => {
    log(`\n${index + 1}. ${record.type} Record:`, 'yellow');
    log(`   Type: ${record.type}`, 'cyan');
    log(`   Name: ${record.name}`, 'cyan');
    log(`   Value: ${record.value}`, 'cyan');
    log(`   TTL: ${record.ttl}`, 'cyan');
    log(`   Purpose: ${record.description}`, 'reset');
  });
  
  return records;
}

function createQuickCopyText() {
  const copyText = `
=== COPY-PASTE READY DNS RECORDS ===

A RECORD:
Type: A
Name: @
Value: 76.76.19.61
TTL: 600

CNAME RECORD:
Type: CNAME
Name: www
Value: vcofone.ai
TTL: 600

=== INSTRUCTIONS ===
1. Delete any existing A or CNAME records for @ and www
2. Add the records above exactly as shown
3. Save changes and wait 5-15 minutes
4. Test: https://vcofone.ai
`;

  fs.writeFileSync('dns-records-copy-paste.txt', copyText);
  log('\n📝 Created dns-records-copy-paste.txt for easy copying', 'green');
}

async function checkCurrentDns() {
  log('\n🔍 CHECKING CURRENT DNS STATUS', 'bold');
  log('================================', 'bold');
  
  const domain = CONFIG.domain;
  log(`\nChecking DNS for ${domain}...`, 'blue');
  
  const hasARecord = await checkDnsStatus(domain);
  
  if (hasARecord) {
    log('✅ Domain has DNS records configured', 'green');
  } else {
    log('❌ No DNS records found or not pointing to Vercel yet', 'yellow');
  }
  
  log(`\n🌐 Check propagation status at:`, 'cyan');
  log(`   ${CONFIG.checkDnsUrl}`, 'reset');
}

function promptUserActions() {
  log('\n🚀 NEXT STEPS - AUTOMATED WORKFLOW', 'bold');
  log('===================================', 'bold');
  
  log('\n1. 🌐 Opening GoDaddy Login...', 'yellow');
  if (openBrowser(CONFIG.godaddyLoginUrl)) {
    log('   ✅ Browser opened - log into GoDaddy', 'green');
  } else {
    log(`   ❌ Please manually visit: ${CONFIG.godaddyLoginUrl}`, 'red');
  }
  
  log('\n2. 📋 DNS Records Ready:', 'yellow');
  log('   ✅ Check dns-records-copy-paste.txt', 'green');
  log('   ✅ Copy-paste the records into GoDaddy DNS', 'green');
  
  log('\n3. 🔍 After setup, check propagation:', 'yellow');
  log(`   ✅ Visit: ${CONFIG.checkDnsUrl}`, 'green');
  
  log('\n4. 🎯 Test your live site:', 'yellow');
  log(`   ✅ https://${CONFIG.domain}`, 'green');
  log(`   ✅ https://www.${CONFIG.domain}`, 'green');
}

function showGodaddySteps() {
  log('\n📖 DETAILED GODADDY STEPS', 'bold');
  log('=========================', 'bold');
  
  const steps = [
    'Log into your GoDaddy account',
    'Go to "My Products" from the top menu',
    `Find "vcofone.ai" in your domain list`,
    'Click "DNS" next to your domain',
    'Look for existing A and CNAME records',
    'DELETE any existing @ (A record) and www (CNAME) records',
    'Click "Add" to create new records',
    'Add the A record: @ → 76.76.19.61',
    'Add the CNAME record: www → vcofone.ai',
    'Save all changes',
    'Wait 5-15 minutes for propagation'
  ];
  
  steps.forEach((step, index) => {
    log(`\n${index + 1}. ${step}`, 'cyan');
  });
}

async function main() {
  log('🌐 GoDaddy DNS Automation for vCFO of One', 'bold');
  log('===========================================', 'bold');
  
  // Generate DNS records
  generateDnsRecords();
  
  // Create copy-paste file
  createQuickCopyText();
  
  // Check current DNS status
  await checkCurrentDns();
  
  // Show detailed steps
  showGodaddySteps();
  
  // Prompt next actions
  promptUserActions();
  
  log('\n🎉 AUTOMATION COMPLETE!', 'bold');
  log('========================', 'bold');
  log('✅ DNS records generated', 'green');
  log('✅ Copy-paste file created', 'green');
  log('✅ Browser opened (if supported)', 'green');
  log('✅ Propagation check ready', 'green');
  
  log('\n⏰ TIMELINE:', 'yellow');
  log('   • DNS setup: 2-3 minutes', 'reset');
  log('   • Propagation: 5-15 minutes', 'reset');
  log('   • Live site: 15-20 minutes total', 'reset');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { 
  CONFIG, 
  generateDnsRecords, 
  checkDnsStatus, 
  createQuickCopyText 
}; 