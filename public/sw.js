// App cũ (PWA) từng đăng ký service worker ở looklab.space và cache giao diện app. Trình duyệt tải lại
// file này khi người dùng quay lại: nó xoá cache cũ, tự huỷ đăng ký rồi tải lại trang, để trang giới thiệu hiện ra.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) client.navigate(client.url);
    })(),
  );
});
