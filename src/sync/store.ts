import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';

interface Store {
  jwt: string
  yearId: string
  intervals: unknown[]
}
const useStore = () => {
  const [store, setStore] = createStore<Store>({
    jwt: '',
    yearId: '',
    intervals: [],
  });

  const setToken = (jwt: string) => {
    setStore({ jwt });
  };
  const setYear = (yearId: string) => {
    setStore({ yearId });
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
    setYear,
    addInterval,
    clearIntervals,
  };
};

export default createRoot(useStore);
