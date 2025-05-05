// Give your cache a name and, optionally, list the files you want to cache.
const CACHE_NAME = "my-app-cache-v1";
const ASSETS_TO_CACHE = [
  // '/script.js',
  // Add more files as needed...
];

// INSTALL: Cache Files (Optional)
/* self.addEventListener('install', (event) => {
  console.log('Service worker installed');

  // If you want offline caching, uncomment the code below. 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => { 
      return cache.addAll(ASSETS_TO_CACHE);
    })
  ); 
  // Tell the browser to activate this SW immediately after installation,
  // rather than waiting until the old SW is gone.
  self.skipWaiting();
});
 */

// ACTIVATE: Clear Old Caches
/* self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  
  // In this example, we remove all caches that don't match our current CACHE_NAME.
  // If you'd rather just delete *all* caches, that's shown in the commented code below.
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );

  // If you want to remove ALL caches (every time you activate):
  // event.waitUntil(
  //   caches.keys().then((cacheNames) =>
  //     Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
  //   )
  // );

  // Take control of all open clients/tabs immediately
  return self.clients.claim();
}); */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Service Worker deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })()
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker Intercepting Fetch:", event.request.url); // Log URL

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response.ok) {
          console.error(
            `HTTP error! status: ${response.status} for URL ${event.request.url}`
          );
        } else {
          console.log("Fetch successful:", event.request.url);
        }
        return response;
      })
      .catch((error) => {
        console.error("Fetch failed:", error, "for URL:", event.request.url); // Log URL with error

        // Here is where you can handle offline scenarios.
        // Example: Return an offline fallback page or a cached response.
        return new Response("<h1>Oops! You are offline</h1>", {
          headers: { "Content-Type": "text/html" },
        });
      })
  );
});

// FETCH: Network requests, with your existing logic
/*self.addEventListener('fetch', (event) => {
  console.log('Service worker fetch event:', event.request.url);
  event.respondWith(
    // If you DO NOT want offline caching at all, you can just fetch directly:
    fetch(event.request)
      .then((response) => {
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
        }
        console.log('Fetch successful:', event.request.url);
        return response;
      })
      .catch((error) => {
        console.error('Fetch failed:', error);

        // Here is where you can handle offline scenarios.
        // Example: Return an offline fallback page or a cached response.
        return new Response('<h1>Oops! You are offline</h1>', {
          headers: { 'Content-Type': 'text/html' },
        });
      })

    
    // If you WANT to serve from the cache first (and then fallback to network),
    // uncomment and adjust the code below:
    
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('Serving from cache:', event.request.url);
        return cachedResponse;
      } else {
        return fetch(event.request)
          .then((response) => {
            // Optionally, cache the fetched response for future offline use:
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch((error) => {
            console.error('Fetch failed and no cache available:', error);
            return new Response('<h1>Oops! You are offline</h1>', {
              headers: { 'Content-Type': 'text/html' },
            });
          });
      }
    })
    
  );
});*/
