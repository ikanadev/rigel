import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

import { syncApp, stopSyncs, setData, downloadAndSync } from '@app/sync';
import { JWT_KEY, EXIT_MESSAGE, SET_DATA_MSG, DOWNLOAD_AND_SYNC_MSG } from '@app/utils/constants';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (ev) => {
  if (Boolean(ev.data) && ev.data.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
  if (Boolean(ev.data) && ev.data.type === SET_DATA_MSG) {
    setData(ev.data.jwtStr, ev.data.yearId);
  }
  if (Boolean(ev.data) && ev.data.type === JWT_KEY) {
    syncApp();
  }
  if (Boolean(ev.data) && ev.data.type === EXIT_MESSAGE) {
    stopSyncs();
  }
  if (Boolean(ev.data) && ev.data.type === DOWNLOAD_AND_SYNC_MSG) {
    downloadAndSync();
  }
});

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();
