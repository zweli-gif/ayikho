const CACHE_NAME = 'ayikho-study-cache-v19';
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/ayikho-signin.html',
    '/app.html',
    '/ayikho-onboarding-v2.html',
    '/ayikho-chapter-home.html',
    '/auth.js',
    '/student-data.js',
    '/firebase-config.js',
    '/tracking.js',
    // Financial Accounting N4
    '/ayikho-chapter-concepts.html',
    '/ayikho-chapter-accounting.html',
    '/ayikho-chapter-journals.html',
    '/ayikho-chapter-trial-balance.html',
    '/ayikho-chapter-cash-journals.html',
    '/ayikho-chapter-debtors-creditors.html',
    '/ayikho-chapter-vat.html',
    '/ayikho-chapter-adjustments.html',
    '/ayikho-chapter-financial-statements.html',
    '/ayikho-chapter-bank-recon.html',
    '/ayikho-quiz.html',
    '/ayikho-capstone.html',
    '/ayikho-papers.html',
    '/ayikho-practice-exam.html',
    '/ayikho-memos.html',
    '/ayikho-profile.html',
    '/quiz-bank.js',
    '/capstone-bank.js',
    '/video-lessons.js',
    // Management Communication N4
    '/mc-chapter-communication-theory.html',
    '/mc-chapter-meeting-procedures.html',
    '/mc-chapter-business-letters.html',
    '/mc-chapter-memos-reports.html',
    '/mc-chapter-oral-communication.html',
    '/mc-chapter-visual-communication.html',
    '/mc-chapter-reading-comprehension.html',
    '/mc-chapter-language-editing.html',
    '/mc-quiz-bank.js',
    '/mc-video-lessons.js',
    // Computer Practice N4
    '/cp-chapter-intro-computers.html',
    '/cp-chapter-word-processing.html',
    '/cp-chapter-spreadsheets.html',
    '/cp-chapter-presentations.html',
    '/cp-chapter-email.html',
    '/cp-chapter-data-management.html',
    '/cp-chapter-internet.html',
    '/cp-chapter-security.html',
    // Entrepreneurship & Business Management N4
    '/ebm-chapter-intro-entrepreneurship.html',
    '/ebm-chapter-creativity.html',
    '/ebm-chapter-market-feasibility.html',
    '/ebm-chapter-financial-feasibility.html',
    '/ebm-chapter-business-plan.html',
    '/ebm-chapter-starting-business.html',
    '/ebm-chapter-managing-business.html',
    '/ebm-chapter-ethics.html'
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

    // Network-first for HTML pages (always get latest), cache-first for assets
    const isHTML = url.endsWith('.html') || url.endsWith('/');
    if (isHTML) {
        // Network-first: try network, fall back to cache
        event.respondWith(
            fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                return caches.match(event.request);
            })
        );
    } else {
        // Stale-while-revalidate for JS, CSS, images, audio
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => {});
                return cachedResponse || fetchPromise;
            })
        );
    }
});
