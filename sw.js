const STATIC_CACHE_NAME = 'static-cache-v1.2';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

self.addEventListener('install', (event) => {
    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/index.html');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/pages/all-notes.html');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/pages/offline.html');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/pages/recent.html');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/js/app.js');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/js/firebase.js');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/js/firebase-functions.js');
        cache.add('images/icons/android-launchericon-48-48.png');
        cache.add('images/icons/android-launchericon-72-72.png');
        cache.add('images/icons/android-launchericon-96-96.png');
        cache.add('images/icons/android-launchericon-144-144.png');
        cache.add('images/icons/android-launchericon-192-192.png');
        cache.add('images/icons/android-launchericon-512-512.png');
        cache.add('https://evelynbahena7u7.github.io/PWA-practica7/manifest.json');
    });
    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
      return cache.addAll([
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
        'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js'
      ]);
    });
 
    event.waitUntil(Promise.all([respCache,respCacheInmutable]));
 
});

self.addEventListener('activate', (event) =>{
    console.log("Activado!");

    const proDelete = caches.keys().then((cachesItems) =>{
        cachesItems.forEach(element =>{
            if(element !== STATIC_CACHE_NAME   && element.includes('static')){
                return caches.delete(element);
            }
        })
    })

    event.waitUntil(proDelete);
})

self.addEventListener('fetch', event =>{
    const respCache = caches.match(event.request)
    event.respondWith(respCache);
});
