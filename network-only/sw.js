/* global self, fetch */

function networkOnlyStrategy (event) {
  return fetch(event.request)
}

self.addEventListener('fetch', (event) => {
  event.respondWith(networkOnlyStrategy(event))
})

self.addEventListener('error', (e) => {
  console.error('something happend', e)
})
