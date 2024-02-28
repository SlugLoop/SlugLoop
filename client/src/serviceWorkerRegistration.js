/**
 * register is a function that allows a service worker to register in the web application
 */
export function register() { // defines the function register()
  if ('serviceWorker' in navigator) { // checks if the browser supports service workers by seeing if it is in the navigator
    const onsuccess = () => console.log('[Service Worker] Registered') // defines the success callback
    const onfailure = () => console.log('[Service Worker] Failed') // defines the failure callback

    // Use the correct path with the PUBLIC_URL environment variable
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
     // registers the service worker at the url swURL, then callback onsuccess is called
     //if registration fails, the callback onfailure is called
    navigator.serviceWorker.register(swUrl).then(onsuccess).catch(onfailure)
    
  }
}

/**
 * unregister is a function that allows a service worker to unregister from the web application
 */
export function unregister() { // defines the function unregister()
  if ('serviceWorker' in navigator) { // checks if the browser supports service workers by seeing if it is in the navigator
    const onsuccess = () => console.log('[Service Worker] Unregistered') // defines the success callback, logs a message to print
    
    navigator.serviceWorker.ready // receives the registration of the worker
      .then((registration) => {
        registration.unregister() // unregister() method is called on the registration object to unregister the worker
      })
      .then(onsuccess) // onsuccess callback is called
  }
}
