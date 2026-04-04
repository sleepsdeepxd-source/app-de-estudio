// ── Service Worker — Cuantificador Hormonal PRO ────────────────────
// Estrategia: Cache-first para archivos estáticos (app shell),
// con actualización en background (stale-while-revalidate).

const CACHE_NAME = 'hormonas-v1';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ── Install: precachear todos los assets ─────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  // Activar inmediatamente sin esperar a que se cierre la pestaña anterior
  self.skipWaiting();
});

// ── Activate: limpiar caches viejos ──────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  // Tomar control de todas las pestañas abiertas
  self.clients.claim();
});

// ── Fetch: stale-while-revalidate ─────────────────────────────────────
// Devuelve desde caché al instante y actualiza en background.
// Si no hay caché (primera vez offline), intenta red.
self.addEventListener('fetch', event => {
  // Solo interceptar peticiones GET del mismo origen (o assets relativos)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const networkFetch = fetch(event.request)
          .then(response => {
            // Guardar copia fresca en caché solo si la respuesta es válida (ok = 2xx)
            if (response && response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => null);

        // Devolver caché al instante; la red actualiza en segundo plano
        return cached || networkFetch;
      })
    )
  );
});
