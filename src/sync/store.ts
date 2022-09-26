import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';

interface Store {
  jwt: string
  intervals: unknown[]
}
export const useStore = () => {
  const [store, setStore] = createStore<Store>({
    jwt: '',
    intervals: [],
  });

  const setToken = (jwt: string) => {
    setStore({ jwt });
  };
  const addInterval = (id: unknown) => {
    setStore((prev) => ({ intervals: [...prev.intervals, id] }));
  };
  const clearIntervals = () => {
    setStore('intervals', []);
  };

  return {
    store,
    setToken,
    addInterval,
    clearIntervals,
  };
};

export default createRoot(useStore);
