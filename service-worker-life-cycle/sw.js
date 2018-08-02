/* global self */
self.addEventListener('install', () => {
  console.log('Nuevo caché instalado')
})

self.addEventListener('activate', () => {
  console.log('Viejo caché eliminado')
})

self.addEventListener('error', (e) => {
  console.error('something happend', e)
})
