const CACHE = "ayikho-v2";
const SHELL = ["/index.html"];

self.addEventListener("install", function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(SHELL); }));
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    })
  );
  self.clients.claim();
});

// NETWORK FIRST always — never block requests, only fall back if offline
self.addEventListener("fetch", function(e) {
  if(e.request.method !== "GET") return;
  // Only intercept navigation to index.html — everything else goes straight to network
  if(e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(function() {
        return caches.match("/index.html");
      })
    );
  }
  // All other requests (chapters, quizzes, Firebase etc) — let them pass through unmodified
});
