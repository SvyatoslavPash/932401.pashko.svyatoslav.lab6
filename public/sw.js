const CACHE_NAME = 'temp-converter-v3';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Кеширование ресурсов');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});