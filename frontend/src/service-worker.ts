/// <reference lib="webworker" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for details about Workbox.

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'prompt-library-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/apple-touch-icon.png'
];

// Install handler - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate handler - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
  // Tell the active service worker to take control of the page immediately
  self.clients.claim();
});

// Fetch handler - response with cached resources
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    // Network-first strategy for API calls
    if (event.request.url.includes('/api/')) {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            // Cache a clone of the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              // Only cache successful responses
              if (response.status === 200) {
                cache.put(event.request, responseToCache);
              }
            });
            return response;
          })
          .catch(() => {
            // If network request fails, try to serve from cache
            return caches.match(event.request);
          })
      );
    } else {
      // Cache-first strategy for static assets
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request).then((response) => {
            // Cache a clone of the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              // Only cache successful responses for the main domain
              if (
                response.status === 200 &&
                !event.request.url.includes('chrome-extension://')
              ) {
                cache.put(event.request, responseToCache);
              }
            });
            return response;
          });
        })
      );
    }
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 