import { syncStudents, downloadAndSyncStudents } from './students';
import { syncClassPeriods, downloadAndSyncClassPeriods } from './classPeriods';
import { syncAttendanceDays, donwloadAndSyncAttendanceDays } from './attendanceDays';
import { syncAttendances, downloadAndSyncAttendances } from './attendances';
import { syncActivities, downloadAndSyncActivities } from './activities';
import { syncScores, downloadAndSyncScores } from './scores';
import useStore from './store';

const syncInterval = 1000 * 30; // 30 seconds

export const setData = (jwt: string, yearId: string) => {
  const { setToken, setYear } = useStore;
  setToken(jwt);
  setYear(yearId);
};

export const downloadAndSync = () => {
  void downloadAndSyncStudents();
  void downloadAndSyncClassPeriods();
  void donwloadAndSyncAttendanceDays();
  void downloadAndSyncAttendances();
  void downloadAndSyncActivities();
  void downloadAndSyncScores();
};

export const syncApp = () => {
  const { addInterval } = useStore;
  const studentIntevalId = setInterval(() => {
    void syncStudents();
    void syncClassPeriods();
    void syncAttendanceDays();
    void syncAttendances();
    void syncActivities();
    void syncScores();
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
