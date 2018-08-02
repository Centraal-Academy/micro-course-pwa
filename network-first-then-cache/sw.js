/* global self, caches, fetch */
const CACHE_NAME = 'cache-v1'
const CACHE_ELEMENTS = [
  '/',
  '/index.html',
  '/index.js'
]

function installCache (cacheName, cacheElements) {
  return caches.open(cacheName)
    .then(cache => cache.addAll(cacheElements))
}

function dropOldCache (actualCache) {
  return caches.keys()
    .then(cacheKeys => {
      return Promise.all(
        cacheKeys
          .filter(key => key !== actualCache)
          .map(cacheName => {
            console.log('cache-name', cacheName)
            caches.delete(cacheName)
          })
      )
    })
}

function networkFirstThenCacheStrategy (event) {
  return fetch(event.request)
    .catch(() => caches.match(event.request))
}

self.addEventListener('install', (event) => {
  event.waitUntil(installCache(CACHE_NAME, CACHE_ELEMENTS))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(dropOldCache(CACHE_NAME))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(networkFirstThenCacheStrategy(event))
})

self.addEventListener('error', (e) => {
  console.error('something happend', e)
})
