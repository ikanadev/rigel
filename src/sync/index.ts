import { syncStudents, downloadAndSyncStudents } from './students';
import { syncClassPeriods, downloadAndSyncClassPeriods } from './classPeriods';
import { syncAttendanceDays, donwloadAndSyncAttendanceDays } from './attendanceDays';
import { syncAttendances, downloadAndSyncAttendances } from './attendances';
import { syncActivities, downloadAndSyncActivities } from './activities';
import { syncScores, downloadAndSyncScores } from './scores';
import useStore from './store';
import { log } from '@app/utils/functions';

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

const syncData = async () => {
  await syncStudents();
  await syncClassPeriods();
  await syncAttendanceDays();
  await syncAttendances();
  await syncActivities();
  await syncScores();
};

export const syncApp = () => {
  const { addInterval } = useStore;
  const studentIntevalId = setInterval(() => {
    void syncData();
  }, syncInterval);
  addInterval(studentIntevalId);
};

export const stopSyncs = () => {
  const { store, clearIntervals } = useStore;
  log(`Clearing ${store.intervals.length} syncs`);
  store.intervals.forEach((intervalId) => {
    // @ts-expect-error
    clearInterval(intervalId);
  });
  clearIntervals();
};
