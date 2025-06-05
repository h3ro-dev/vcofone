/**
 * Service Worker for vCFO application
 * Implements advanced caching strategies and offline support
 */

const CACHE_NAME = 'vcofone-v1';
const DYNAMIC_CACHE_NAME = 'vcofone-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  '/images/logo.svg',
  '/images/offline-placeholder.webp',
];

// Cache strategies
const CACHE_STRATEGIES = {
  networkFirst: async (request, cacheName = DYNAMIC_CACHE_NAME) => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  },

  cacheFirst: async (request, cacheName = CACHE_NAME) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      throw error;
    }
  },

  staleWhileRevalidate: async (request, cacheName = DYNAMIC_CACHE_NAME) => {
    const cachedResponse = await caches.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        const cache = caches.open(cacheName);
        cache.then(cache => cache.put(request, networkResponse.clone()));
      }
      return networkResponse;
    });

    return cachedResponse || fetchPromise;
  },
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('vcofone-') && 
                     cacheName !== CACHE_NAME && 
                     cacheName !== DYNAMIC_CACHE_NAME;
            })
            .map(cacheName => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // API requests - Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      CACHE_STRATEGIES.networkFirst(request)
        .catch(() => {
          // Return cached data or error response
          return new Response(
            JSON.stringify({ error: 'Offline - cached data may be available' }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // Static assets - Cache First
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|webp|avif|woff2?)$/)) {
    event.respondWith(
      CACHE_STRATEGIES.cacheFirst(request)
        .catch(() => {
          // Return offline placeholder for images
          if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|avif)$/)) {
            return caches.match('/images/offline-placeholder.webp');
          }
        })
    );
    return;
  }

  // HTML pages - Stale While Revalidate
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      CACHE_STRATEGIES.staleWhileRevalidate(request)
        .catch(() => caches.match('/offline'))
    );
    return;
  }

  // Default - Network First
  event.respondWith(
    CACHE_STRATEGIES.networkFirst(request)
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncOfflineData());
  }
});

// Push notifications
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/images/icon-192.png',
    badge: '/images/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'view',
        title: 'View',
      },
      {
        action: 'close',
        title: 'Close',
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click:', event.action);
  
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-data') {
    event.waitUntil(updateCachedData());
  }
});

// Helper functions
async function syncOfflineData() {
  // Implement offline data synchronization
  console.log('[Service Worker] Syncing offline data...');
}

async function updateCachedData() {
  // Implement periodic cache updates
  console.log('[Service Worker] Updating cached data...');
  
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const requests = await cache.keys();
  
  // Update critical API endpoints
  const criticalEndpoints = [
    '/api/user',
    '/api/dashboard',
  ];
  
  for (const endpoint of criticalEndpoints) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        await cache.put(endpoint, response);
      }
    } catch (error) {
      console.error(`[Service Worker] Failed to update ${endpoint}:`, error);
    }
  }
}

// Message handler for cache management
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});