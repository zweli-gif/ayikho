const CACHE_NAME = 'ayikho-study-cache-v1';
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/ayikho-onboarding-v2.html',
    '/ayikho-chapter-home.html',
    '/auth.js',
    '/student-data.js',
    '/firebase-config.js',
    '/tracking.js',
    '/ayikho-chapter-concepts.html',
    '/ayikho-chapter-accounting.html',
    '/ayikho-chapter-journals.html',
    '/ayikho-chapter-trial-balance.html',
    '/ayikho-chapter-cash-journals.html',
    '/ayikho-chapter-debtors-creditors.html',
    '/ayikho-chapter-vat.html',
    '/ayikho-chapter-adjustments.html',
    '/ayikho-chapter-financial-statements.html',
    '/ayikho-chapter-bank-recon.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
            .catch(err => console.log('Precache failed (expected if files are missing):', err))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Stale-while-revalidate strategy for deeper offline
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    // Ignore non-http connections (e.g. extension) and firebase APIs
    const url = event.request.url;
    if (!url.startsWith('http') && !url.startsWith('https')) return;
    if (url.includes('identitytoolkit.googleapis.com')) return;
    if (url.includes('securetoken.googleapis.com')) return;
    if (url.includes('firestore.googleapis.com')) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // Cache the dynamically fetched response (if valid)
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch((err) => {
                console.log("Fetch failed, utilizing cache", err);
            });
            // Return cached immediately if present, else wait for network
            return cachedResponse || fetchPromise;
        })
    );
});
