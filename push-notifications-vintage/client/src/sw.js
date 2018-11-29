/* global self */

self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  const data = event.data.json()
  const notificationChain = self.registration.showNotification(data.title, {
    body: data.body
  })

  event.waitUntil(notificationChain)
})
