/* global fetch, PUBLIC_SERVER_KEY, ENDPOINT_SAVE_SUBSCRIPTION */

function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscriptionToBackEnd (subscription) {
  return fetch(ENDPOINT_SAVE_SUBSCRIPTION, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
}

function validateResponse (response) {
  if (!response.ok) {
    throw new Error('Bad status code from server.')
  }

  return response.json()
}
function saveSubscription (subscription) {
  console.log(subscription)
  return sendSubscriptionToBackEnd(subscription)
    .then(validateResponse)
    .then(console.log)
    .catch(console.error)
}

function subscribePushManager (registration) {
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_SERVER_KEY)
  })
}

const manager = (function (urlServiceWorker) {
  let registration = ''

  function setRegister (register) {
    registration = register
    return register
  }

  return {
    registerServiceWorker: () =>
      navigator.serviceWorker.register(urlServiceWorker)
        .then(() => navigator.serviceWorker.ready)
        .then(setRegister),
    getRegistration: () => registration
  }
})('/sw.js')

function init () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      manager.registerServiceWorker()
        .then(subscribePushManager)
        .then(saveSubscription)
        .catch(registrationError => {
          console.log(registrationError)
        })
    })
  }
}

init()
