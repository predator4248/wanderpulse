/**
 * WANDERPULSE BALI - SERVICE WORKER (OFFLINE PWA CACHING & INSTANT UPDATE)
 * Network-First for HTML navigation so deployed updates on Vercel reflect instantly.
 * Cache-First with background revalidation for static assets.
 */

const CACHE_NAME = 'wanderpulse-bali-v3.1-gemini';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css?v=3.1.0',
  '/css/components.css?v=3.1.0',
  '/css/3d-effects.css?v=3.1.0',
  '/css/responsive.css?v=3.1.0',
  '/js/data.js?v=3.1.0',
  '/js/app.js?v=3.1.0',
  '/js/tilt3d.js?v=3.1.0',
  '/js/three-scene.js?v=3.1.0',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. For HTML navigation: NETWORK FIRST with Cache Fallback
  // Guarantees users always see the latest deployed Vercel release when online
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('/index.html')
            .then(cached => cached || caches.match('/'));
        })
    );
    return;
  }

  // 2. For API endpoints: Network first, then cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 3. For static assets (CSS, JS, images, fonts): Cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const resClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return networkResponse;
      });
    })
  );
});
