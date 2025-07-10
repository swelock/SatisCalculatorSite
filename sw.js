// Service Worker для Satisfactory Calculator
const CACHE_NAME = 'satisfactory-calc-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/site.webmanifest',
  '/404.html',
  '/500.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Установка Service Worker
self.addEventListener('install', event => {
  console.log('SW: Installing Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('SW: All files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.log('SW: Cache failed:', error);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', event => {
  console.log('SW: Activating Service Worker');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('SW: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Обработка запросов (Cache First стратегия для статических файлов)
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache First для статических ресурсов
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'font' ||
      request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('SW: Serving from cache:', request.url);
            return response;
          }
          return fetch(request).then(response => {
            // Кэшируем новые ресурсы
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
        .catch(() => {
          console.log('SW: Failed to fetch:', request.url);
        })
    );
    return;
  }

  // Network First для HTML страниц
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          console.log('SW: Network failed, trying cache:', request.url);
          return caches.match(request).then(response => {
            if (response) {
              return response;
            }
            // Fallback to offline page
            return caches.match('/404.html');
          });
        })
    );
    return;
  }

  // Stale While Revalidate для остальных запросов
  event.respondWith(
    caches.match(request)
      .then(response => {
        const fetchPromise = fetch(request).then(networkResponse => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });

        return response || fetchPromise;
      })
      .catch(() => {
        console.log('SW: Request failed:', request.url);
      })
  );
});

// Обработка сообщений от клиента
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME,
      cached_urls: urlsToCache.length
    });
  }
});

// Push уведомления (для будущих обновлений)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Открыть приложение',
          icon: '/icons/action-explore.png'
        },
        {
          action: 'close',
          title: 'Закрыть',
          icon: '/icons/action-close.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Просто закрываем уведомление
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background Sync (для отправки данных при восстановлении сети)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('SW: Background sync triggered');
    event.waitUntil(
      // Здесь можно добавить логику синхронизации данных
      Promise.resolve()
    );
  }
});

// Periodic Background Sync (для проверки обновлений)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'check-updates') {
    console.log('SW: Periodic sync - checking for updates');
    event.waitUntil(
      // Проверяем обновления приложения
      fetch('/version.json')
        .then(response => response.json())
        .then(data => {
          if (data.version !== CACHE_NAME) {
            console.log('SW: New version available');
            // Можно показать уведомление об обновлении
            return self.registration.showNotification('Доступно обновление!', {
              body: 'Новая версия Satisfactory Calculator готова к установке',
              icon: '/icons/icon-192x192.png',
              tag: 'update-available'
            });
          }
        })
        .catch(error => {
          console.log('SW: Update check failed:', error);
        })
    );
  }
});

console.log('SW: Service Worker script loaded'); 