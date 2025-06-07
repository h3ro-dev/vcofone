#!/usr/bin/env node

/**
 * vCFO of One - Dynamic Agent Orchestrator
 * 
 * Template for creating orchestrators for other "Of One" sites.
 * Replace vCFO of One, Small business owners without a full-time CFO, and customize TASK_REGISTRY.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Site-specific configuration
const SITE_CONFIG = {
  name: 'vCFO of One',  // e.g., 'Director of One'
  domain: 'vcofone.ai',   // e.g., 'directorofone.ai'
  targetAudience: 'Small business owners without a full-time CFO', // e.g., 'one-person department managers'
  primaryColor: '#4169E1',  // Utlyze blue (keep consistent)
  accentColor: '#00A878',  // Customize per site type
};

// Task Registry with Dependencies
const TASK_REGISTRY = {
  // Design & Branding Tasks
  'design-system': {
    id: 'design-system',
    name: `Create ${SITE_CONFIG.name} Design System`,
    path: 'frontend/src/styles/design-system.ts',
    dependencies: [],
    estimatedHours: 3,
    priority: 'CRITICAL',
    prompt: `Create design system for ${SITE_CONFIG.name}. Use Utlyze blue (#4169E1) as primary, ${SITE_CONFIG.accentColor} as accent. Target audience: ${SITE_CONFIG.targetAudience}. Clean, professional, trustworthy design.`,
    completionCheck: () => fs.existsSync('frontend/src/styles/design-system.ts')
  },

  // Content Creation Tasks
  'content-strategy': {
    id: 'content-strategy',
    name: `Develop ${SITE_CONFIG.name} Content`,
    dependencies: [],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: `Create content for ${SITE_CONFIG.name}. Target: ${SITE_CONFIG.targetAudience}. Pain points: Making money or just managing money?, Hours in Excel with no clarity, Unpredictable cashflow, Unclear KPIs and metrics. Solution: AI-driven virtual CFO providing financial insight and oversight on demand. Focus on Real-time financial insights, Cash flow forecasting, Custom KPI tracking, ROI analysis on all initiatives.`,
    completionCheck: () => fs.existsSync('content/copy/homepage.md')
  },

  // Frontend Development Tasks
  'nextjs-setup': {
    id: 'nextjs-setup',
    name: 'Initialize Next.js Project',
    dependencies: [],
    estimatedHours: 2,
    priority: 'CRITICAL',
    prompt: 'Initialize Next.js 14 with TypeScript, Tailwind CSS, App Router. Standard Utlyze setup.',
    completionCheck: () => fs.existsSync('frontend/package.json')
  },

  'component-library': {
    id: 'component-library',
    name: 'Build Component Library',
    dependencies: ['nextjs-setup', 'design-system'],
    estimatedHours: 4,
    priority: 'HIGH',
    prompt: 'Create reusable components using design system. Standard Utlyze component set.',
    completionCheck: () => fs.existsSync('frontend/src/components/ui/Button.tsx')
  },

  'landing-page': {
    id: 'landing-page',
    name: `Build ${SITE_CONFIG.name} Landing Page`,
    dependencies: ['component-library', 'content-strategy'],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: `Build landing page for ${SITE_CONFIG.name}. Hero, pain points, solution, features, testimonials, CTAs. Multiple consultation CTAs.`,
    completionCheck: () => fs.existsSync('frontend/src/app/page.tsx')
  },

  // Backend Tasks
  'api-setup': {
    id: 'api-setup',
    name: 'Setup API Infrastructure',
    dependencies: [],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Standard Express.js API setup with TypeScript. Vercel-ready.',
    completionCheck: () => fs.existsSync('backend/src/api/server.ts')
  },

  // Enhancement Tasks - Phase 2
  'api-integration': {
    id: 'api-integration',
    name: 'Connect Frontend Forms to Backend API',
    dependencies: ['landing-page', 'api-setup'],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: 'Connect all frontend forms (lead capture, consultation booking, contact) to backend API endpoints. Use fetch with proper error handling. Show success/error states in UI. Update modal to show confirmation messages.',
    completionCheck: () => fs.existsSync('frontend/src/lib/api.ts')
  },

  'animations': {
    id: 'animations',
    name: 'Add Smooth Animations and Interactions',
    dependencies: ['landing-page'],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: 'Add smooth scroll animations, hover effects, and micro-interactions. Use Framer Motion or CSS animations. Add scroll-triggered animations for sections. Make CTAs pulse subtly. Add loading states with skeleton screens.',
    completionCheck: () => fs.existsSync('frontend/src/components/animations/index.tsx')
  },

  'seo-optimization': {
    id: 'seo-optimization',
    name: 'Implement SEO and Meta Tags',
    dependencies: ['landing-page'],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: 'Add comprehensive SEO optimization. Create metadata.ts with dynamic meta tags, Open Graph tags, Twitter cards. Add structured data for local business. Create robots.txt and sitemap.xml. Target keywords: virtual CFO, small business financial management.',
    completionCheck: () => fs.existsSync('frontend/app/metadata.ts')
  },

  'dashboard-mockup': {
    id: 'dashboard-mockup',
    name: 'Create Dashboard Preview Page',
    dependencies: ['component-library'],
    estimatedHours: 3,
    priority: 'MEDIUM',
    prompt: 'Create a dashboard preview page showing what users get. Include: cash flow chart, KPI cards, revenue trends graph, expense breakdown pie chart. Use recharts or chart.js. Make it interactive but with demo data. Route: /dashboard-preview',
    completionCheck: () => fs.existsSync('frontend/src/app/dashboard-preview/page.tsx')
  },

  'testimonials-enhancement': {
    id: 'testimonials-enhancement',
    name: 'Create Dynamic Testimonials Component',
    dependencies: ['component-library'],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: 'Create an animated testimonials carousel component. Add profile images (use placeholder service), company logos, and ratings. Make it auto-rotate with pause on hover. Add video testimonial support. Create TestimonialCard component.',
    completionCheck: () => fs.existsSync('frontend/src/components/testimonials/TestimonialCarousel.tsx')
  },

  'email-templates': {
    id: 'email-templates',
    name: 'Design Email Templates',
    dependencies: ['api-setup'],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: 'Create HTML email templates for: welcome email, consultation confirmation, lead nurture sequence. Use MJML or inline styles. Match brand design. Store in backend/src/templates/emails/. Include plaintext versions.',
    completionCheck: () => fs.existsSync('backend/src/templates/emails/welcome.html')
  },

  'analytics-setup': {
    id: 'analytics-setup',
    name: 'Implement Analytics and Tracking',
    dependencies: ['landing-page'],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: 'Set up Google Analytics 4, Facebook Pixel, and conversion tracking. Create analytics utility functions. Track: page views, form submissions, CTA clicks, scroll depth. Add event tracking for all interactive elements. Use Google Tag Manager.',
    completionCheck: () => fs.existsSync('frontend/src/lib/analytics.ts')
  },

  'pricing-calculator': {
    id: 'pricing-calculator',
    name: 'Build ROI Calculator Widget',
    dependencies: ['component-library'],
    estimatedHours: 3,
    priority: 'MEDIUM',
    prompt: 'Create an interactive ROI calculator. Inputs: current revenue, hours spent on finances, average hourly rate. Show potential savings and ROI from using vCFO. Add animations and real-time updates. Place below pricing section.',
    completionCheck: () => fs.existsSync('frontend/src/components/calculator/ROICalculator.tsx')
  },

  'blog-setup': {
    id: 'blog-setup',
    name: 'Create Blog Infrastructure',
    dependencies: ['nextjs-setup'],
    estimatedHours: 3,
    priority: 'LOW',
    prompt: 'Set up blog using MDX. Create blog layout, post template, and category pages. Add 3 sample posts about CFO tips for small businesses. Create blog index at /blog. Use gray-matter for frontmatter. Add reading time estimation.',
    completionCheck: () => fs.existsSync('frontend/src/app/blog/page.tsx')
  },

  'performance-optimization': {
    id: 'performance-optimization',
    name: 'Optimize Performance',
    dependencies: ['landing-page'],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: 'Optimize for Core Web Vitals. Add image optimization with next/image, lazy loading, code splitting. Implement font optimization. Add resource hints (preconnect, prefetch). Target 95+ Lighthouse score. Use dynamic imports for heavy components.',
    completionCheck: () => fs.existsSync('frontend/next.config.js')
  }

  // Add more tasks as needed...
};

// Standard orchestrator functions (same as CEO of One)
function findReadyTasks() {
  const readyTasks = [];
  const completedTasks = new Set();
  
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
    if (task.completionCheck && task.completionCheck()) {
      completedTasks.add(taskId);
    }
  }
  
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
    if (completedTasks.has(taskId)) continue;
    
    const dependenciesMet = task.dependencies.every(dep => completedTasks.has(dep));
    if (dependenciesMet) {
      readyTasks.push(task);
    }
  }
  
  const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
  readyTasks.sort((a, b) => {
    return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
  });
  
  return { readyTasks, completedTasks };
}

function generateAgentCommands(tasks) {
  const commands = [];
  
  tasks.forEach((task, index) => {
    const command = {
      terminal: index + 1,
      name: task.name,
      command: `cd "${process.cwd()}" && CURSOR_BACKGROUND_AGENT_PROMPT="${task.prompt}" npm run background`,
      estimatedHours: task.estimatedHours,
      priority: task.priority
    };
    commands.push(command);
  });
  
  return commands;
}

function main() {
  console.log(`🚀 ${SITE_CONFIG.name} - Dynamic Agent Orchestrator\n`);
  console.log('Analyzing project state...\n');
  
  const { readyTasks, completedTasks } = findReadyTasks();
  const totalTasks = Object.keys(TASK_REGISTRY).length;
  const blockedTasks = totalTasks - completedTasks.size - readyTasks.length;
  
  console.log(`📊 Task Status:`);
  console.log(`   - Total tasks: ${totalTasks}`);
  console.log(`   - Completed: ${completedTasks.size}`);
  console.log(`   - Ready to start: ${readyTasks.length}`);
  console.log(`   - Blocked: ${blockedTasks}\n`);
  
  if (completedTasks.size > 0) {
    console.log('✅ Completed Tasks:');
    for (const taskId of completedTasks) {
      console.log(`   - ${TASK_REGISTRY[taskId].name}`);
    }
    console.log('');
  }
  
  if (readyTasks.length === 0) {
    if (completedTasks.size === totalTasks) {
      console.log(`🎉 All tasks completed! ${SITE_CONFIG.name} is ready for launch.`);
    } else {
      console.log('⏸️  No tasks are currently ready. Some tasks may be blocked by dependencies.');
    }
    return;
  }
  
  console.log(`🤖 Deploy ${readyTasks.length} Agents Right Now!\n`);
  
  const commands = generateAgentCommands(readyTasks);
  const totalHours = commands.reduce((sum, cmd) => sum + cmd.estimatedHours, 0);
  const maxHours = Math.max(...commands.map(c => c.estimatedHours));
  
  console.log(`⏱️  Estimated time: ${maxHours} hours (running in parallel)`);
  console.log(`📈 Total work: ${totalHours} hours compressed into parallel execution\n`);
  
  console.log('─'.repeat(80));
  commands.forEach(cmd => {
    console.log(`\n### Agent ${cmd.terminal}: ${cmd.name}`);
    console.log(`Priority: ${cmd.priority} | Estimated: ${cmd.estimatedHours} hours`);
    console.log('```bash');
    console.log(cmd.command);
    console.log('```');
  });
  console.log('\n' + '─'.repeat(80));
  
  console.log('\n📋 Instructions:');
  console.log('1. Open ' + commands.length + ' terminal windows or Cursor background agents');
  console.log('2. Copy and run each command above');
  console.log('3. Agents will work autonomously in parallel');
  console.log('4. Run this orchestrator again to see newly available tasks');
  
  const stateFile = path.join(process.cwd(), '.agent-orchestrator-state.json');
  const state = {
    timestamp: new Date().toISOString(),
    projectName: SITE_CONFIG.name,
    completedTasks: Array.from(completedTasks),
    readyTasks: readyTasks.map(t => t.id),
    blockedTasks,
    totalTasks,
    estimatedCompletion: `${maxHours} hours`
  };
  
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log(`\n💾 State saved to ${stateFile}`);
}

if (require.main === module) {
  main();
}

module.exports = { findReadyTasks, generateAgentCommands, TASK_REGISTRY, SITE_CONFIG };