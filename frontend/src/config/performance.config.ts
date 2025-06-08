/**
 * Performance optimization configuration for vCFO application
 * Central configuration for all performance-related settings
 */

export const performanceConfig = {
  // API Configuration
  api: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
  },

  // Image Optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    quality: 75,
    lazyLoadRootMargin: '50px',
    lazyLoadThreshold: 0.1,
  },

  // Bundle Optimization
  bundle: {
    // Chunk size limits in KB
    maxChunkSize: 244,
    maxAssetSize: 244,
    // Libraries to optimize imports for
    optimizePackages: [
      'lodash',
      'date-fns',
      'react-icons',
      'framer-motion',
      '@emotion/react',
      '@emotion/styled',
    ],
  },

  // Performance Monitoring
  monitoring: {
    // Web Vitals thresholds
    vitals: {
      LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
      FID: { good: 100, poor: 300 },   // First Input Delay
      CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
      FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
      TTFB: { good: 800, poor: 1800 }, // Time to First Byte
    },
    // Enable performance logging in development
    enableDevLogging: true,
    // Sample rate for production monitoring (0-1)
    productionSampleRate: 0.1,
  },

  // Caching Strategy
  cache: {
    // Static assets cache duration
    staticAssets: {
      maxAge: 31536000, // 1 year
      immutable: true,
    },
    // API response cache duration by endpoint
    apiEndpoints: {
      '/api/user': 5 * 60, // 5 minutes
      '/api/dashboard': 60, // 1 minute
      '/api/reports': 10 * 60, // 10 minutes
      '/api/settings': 30 * 60, // 30 minutes
    },
    // Browser cache settings
    browser: {
      sessionStorage: {
        maxSize: 5 * 1024 * 1024, // 5MB
        ttl: 30 * 60 * 1000, // 30 minutes
      },
      localStorage: {
        maxSize: 10 * 1024 * 1024, // 10MB
        ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
    },
  },

  // Lazy Loading Configuration
  lazyLoading: {
    // Components to lazy load
    routes: [
      '/dashboard',
      '/reports',
      '/settings',
      '/analytics',
    ],
    // Prefetch strategy
    prefetch: {
      enabled: true,
      strategy: 'hover', // 'hover' | 'visible' | 'idle'
      delay: 150, // ms delay before prefetching
    },
  },

  // Resource Hints
  resourceHints: {
    // DNS prefetch domains
    dnsPrefetch: [
      'https://api.vcofone.ai',
      'https://cdn.vcofone.ai',
      'https://fonts.googleapis.com',
    ],
    // Preconnect domains
    preconnect: [
      'https://api.vcofone.ai',
      'https://fonts.gstatic.com',
    ],
    // Preload critical resources
    preload: [
      {
        href: '/fonts/inter-var.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
  },

  // Service Worker Configuration
  serviceWorker: {
    enabled: true,
    // Cache strategies by route pattern
    cacheStrategies: {
      '/api/*': 'NetworkFirst',
      '/images/*': 'CacheFirst',
      '/fonts/*': 'CacheFirst',
      '/_next/static/*': 'CacheFirst',
      '/': 'NetworkFirst',
    },
    // Offline fallback pages
    offlineFallback: {
      page: '/offline',
      image: '/images/offline-placeholder.webp',
    },
  },

  // Animation Performance
  animation: {
    // Prefer reduced motion
    respectReducedMotion: true,
    // Default animation duration
    defaultDuration: 200,
    // Use GPU acceleration
    useGPU: true,
    // Disable animations on low-end devices
    disableOnLowEnd: true,
  },

  // Database Query Optimization
  database: {
    // Connection pool settings
    connectionPool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000,
    },
    // Query timeout
    queryTimeout: 5000,
    // Enable query caching
    enableQueryCache: true,
    // Batch size for bulk operations
    batchSize: 100,
  },

  // Third-party Script Loading
  scripts: {
    // Load strategy for third-party scripts
    loadStrategy: 'lazyOnload', // 'beforeInteractive' | 'afterInteractive' | 'lazyOnload'
    // Scripts to defer
    defer: [
      'analytics',
      'chat-widget',
      'feedback-widget',
    ],
  },
};

// Performance utilities
export const performanceUtils = {
  // Check if device is low-end
  isLowEndDevice: () => {
    if (typeof window === 'undefined') return false;
    
    const memory = (navigator as any).deviceMemory;
    const connection = (navigator as any).connection;
    
    return (
      memory && memory < 4 || // Less than 4GB RAM
      connection && connection.effectiveType && connection.effectiveType.includes('2g')
    );
  },

  // Get optimal image format
  getOptimalImageFormat: () => {
    if (typeof window === 'undefined') return 'webp';
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5 ? 'webp' : 'jpeg';
  },

  // Calculate adaptive quality based on connection
  getAdaptiveQuality: () => {
    if (typeof window === 'undefined') return performanceConfig.images.quality;
    
    const connection = (navigator as any).connection;
    if (!connection) return performanceConfig.images.quality;
    
    const effectiveType = connection.effectiveType;
    
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 50;
      case '3g':
        return 65;
      case '4g':
        return 85;
      default:
        return performanceConfig.images.quality;
    }
  },
};

export default performanceConfig;