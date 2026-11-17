const CACHE_NAME = 'et-v9';
const ASSETS = [
  './',
  './index.html',
  './test.html',
  './manifest.json',
  './IMG_1070.png',
  './IMG_1071.png',
  './seed-cards.json',
  './js/config.js',
  './js/es-numbers.js',
  './js/app.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request);
    })
  );
});

// Lets the page tell a waiting worker to activate immediately, so the
// "Update available" banner's reload takes effect right away.
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
