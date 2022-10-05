import { db } from '@app/db/dexie';
import { log } from '@app/utils/functions';
import { getAttendanceDays, saveAttendanceDays } from './ky';
import useStore from './store';

export const syncAttendanceDays = async () => {
  const attDaysTxs = await db.attendanceDayTransactions.orderBy('date_time').toArray();

  if (attDaysTxs.length === 0) {
    log('No ATTENDANCEDAYS txs to sync, skipping.');
    return;
  }
  log(`Syncing ${attDaysTxs.length} ATTENDANCEDAYS txs.`);
  await saveAttendanceDays(attDaysTxs);
  const toDeleteIds = attDaysTxs.map((tx) => tx.id);
  await db.attendanceDayTransactions.bulkDelete(toDeleteIds);
};

export const donwloadAndSyncAttendanceDays = async () => {
  const { store } = useStore;
  const serverAttDays = await getAttendanceDays(store.yearId);
  await db.attendanceDays.bulkPut(serverAttDays);
};
