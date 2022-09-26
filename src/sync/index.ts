import syncStudents from './students';
import useStore from './store';

const syncInterval = 1000 * 20; // 20 seconds

export const syncApp = (jwt: string) => {
  const { setToken, addInterval } = useStore;
  setToken(jwt);
  const studentIntevalId = setInterval(() => {
    void syncStudents();
  }, syncInterval);
  addInterval(studentIntevalId);
};

export const stopSyncs = () => {
  const { store, clearIntervals } = useStore;
  console.log(`Clearing ${store.intervals.length} syncs`);
  store.intervals.forEach((intervalId) => {
    // @ts-expect-error
    clearInterval(intervalId);
  });
  clearIntervals();
};
