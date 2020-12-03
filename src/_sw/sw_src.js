importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.0/workbox-sw.js')

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst({
        cacheName: 'default'
    })
)

workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'fonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 30 * 3
            })
        ]
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'resources'
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'image',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 50
            })
        ]
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'audio' || request.destination === 'video',
    new workbox.strategies.CacheFirst({
        cacheName: 'media',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 10
            }),
            new workbox.rangeRequests.RangeRequestsPlugin()
        ]
    })
)

workbox.routing.registerRoute(
    ({url}) => url.pathname.includes('browser-sync'),
    new workbox.strategies.NetworkOnly(),
    'GET'
)

workbox.routing.registerRoute(
    ({url}) => url.pathname.includes('browser-sync'),
    new workbox.strategies.NetworkOnly(),
    'POST'
)