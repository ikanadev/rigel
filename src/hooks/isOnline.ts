import { createSignal, onCleanup, createRoot } from 'solid-js';

const isOnline = () => {
  const [isOnline, setIsOnline] = createSignal(navigator.onLine);

  const setOnline = (): boolean => setIsOnline(true);
  const setOffline = (): boolean => setIsOnline(false);
  window.addEventListener('online', setOnline);
  window.addEventListener('offline', setOffline);

  onCleanup(() => {
    window.removeEventListener('online', setOnline);
    window.removeEventListener('offline', setOffline);
  });

  return isOnline;
};

export default createRoot(isOnline);
