export function register() {
  if ('serviceWorker' in navigator) {
    const onsuccess = () => console.log('[Service Worker] Registered')
    const onfailure = () => console.log('[Service Worker] Failed')

    // Use the correct path with the PUBLIC_URL environment variable
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

    navigator.serviceWorker.register(swUrl).then(onsuccess).catch(onfailure)
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    const onsuccess = () => console.log('[Service Worker] Unregistered')

    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
      })
      .then(onsuccess)
  }
}
