const CACHE_NAME = 'apex-tracker-v1';
// هنا نحدد الملفات اللي يحفظها التطبيق في ذاكرة التليفون باش يفتح ديريكت وسريع
const ASSETS = [
  './',
  './index.html'
];

// 1. مرحلة التثبيت (Install)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. مرحلة تشغيل التطبيق وجلب البيانات (Fetch) حتى لو أوفلاين
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});