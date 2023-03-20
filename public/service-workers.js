// Оголошення іменованої версії кешу
const CACHE_NAME = "my-cache-v1";

// Масив файлів, які ми хочемо кешувати
const urlsToCache = ["/", "/index.html"];

// Встановлення сервісного робітника та кешування файлів
self.addEventListener("install", (event) => {
  // Відкриваємо кеш та додаємо файл
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// При отриманні запиту від браузера, повертаємо відповідь з кешу, якщо вона є, інакше - отримуємо з мережі та кешуємо її
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // повертаємо відповідь з кешу, якщо вона є
      if (response) {
        console.log("Cache hit for", event.request.url);
        return response;
      }

      // отримуємо відповідь з мережі, якщо файлу немає в кеші
      console.log("Cache miss for", event.request.url);
      return fetch(event.request).then((response) => {
        // кладемо відповідь у кеш
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(event.request, response));
        return response.clone();
      });
    })
  );
});
