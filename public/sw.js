const CACHE_NAME = 'baby-shower-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/background-music.mp4',
    '/og-image.png',
    '/icon-192x192.png',
    '/icon-512x512.png',
    '/apple-touch-icon.png',
    // Add other critical assets here if needed
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    // Skip Next.js middleware/API routes if necessary, or just cache everything valid
    const url = new URL(event.request.url);

    // Strategy: Stale-While-Revalidate for most things, Cache First for static assets
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // If we have a cached response, return it, but also update cache in background
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Check if we received a valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Clone the response because it's a stream and can only be consumed once
                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Network failed
            });

            return cachedResponse || fetchPromise;
        })
    );
});
