const CACHE_NAME = 'slugloop-next-v3'
const APP_SHELL = [
  '/manifest.webmanifest',
  '/icons/favicon.ico',
  '/icons/android-chrome-192x192.png',
  '/icons/android-chrome-512x512.png',
]

const STATIC_ASSET_PATTERN =
  /\.(?:png|jpg|jpeg|svg|webp|ico|woff2?)$/i

function fetchFresh(request) {
  return fetch(new Request(request, {cache: 'reload'}))
}

function offlineResponse() {
  return new Response('SlugLoop is offline. Reconnect and refresh to load the app.', {
    status: 503,
    headers: {'Content-Type': 'text/plain; charset=utf-8'},
  })
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          APP_SHELL.map((asset) =>
            cache.add(new Request(asset, {cache: 'reload'})).catch(() => undefined),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) {
    return
  }

  if (requestUrl.pathname === '/sw.js' || requestUrl.pathname.startsWith('/_next/')) {
    return
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(fetchFresh(event.request).catch(() => offlineResponse()))
    return
  }

  if (
    !STATIC_ASSET_PATTERN.test(requestUrl.pathname) &&
    !APP_SHELL.includes(requestUrl.pathname)
  ) {
    return
  }

  event.respondWith(
    fetchFresh(event.request)
      .then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse
        }

        const responseToCache = networkResponse.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return networkResponse
      })
      .catch(() =>
        caches.match(event.request).then((cachedResponse) => cachedResponse || offlineResponse()),
      ),
  )
})
