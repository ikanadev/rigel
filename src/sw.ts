import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

import { syncApp, stopSyncs } from '@app/sync';
import { JWT_KEY, EXIT_MESSAGE } from '@app/utils/constants';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (ev) => {
  if (Boolean(ev.data) && ev.data.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
  if (Boolean(ev.data) && ev.data.type === JWT_KEY) {
    syncApp(ev.data.jwtStr);
  }
  if (Boolean(ev.data) && ev.data.type === EXIT_MESSAGE) {
    stopSyncs();
  }
});

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();
