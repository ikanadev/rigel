import { syncStudents, downloadAndSyncStudents } from './students';
import { syncClassPeriods, downloadAndSyncClassPeriods } from './classPeriods';
import useStore from './store';

const syncInterval = 1000 * 20; // 20 seconds

export const setData = (jwt: string, yearId: string) => {
  const { setToken, setYear } = useStore;
  setToken(jwt);
  setYear(yearId);
};

export const downloadAndSync = () => {
  void downloadAndSyncStudents();
  void downloadAndSyncClassPeriods();
};

export const syncApp = () => {
  const { addInterval } = useStore;
  const studentIntevalId = setInterval(() => {
    void syncStudents();
    void syncClassPeriods();
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
