import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (ev) => {
  if (Boolean(ev.data) && ev.data.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
});

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();
