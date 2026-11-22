// La app se mudó a /birria-tech/. Este service worker borra el caché viejo, se da de baja y recarga: así los
// celulares que la instalaron en /el-rio-suena/ llegan a la redirección y de ahí a la dirección nueva.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
