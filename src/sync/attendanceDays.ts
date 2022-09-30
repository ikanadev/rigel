import { AttendanceDayTransaction } from '@app/types';

import { db } from '@app/db/dexie';
import { attendanceDaySync, getAttendanceDays, saveAttendanceDays } from './ky';
import useStore from './store';

export const syncAttendanceDays = async () => {
  let syncResp = await attendanceDaySync();
  const attDaysTxs = await db.attendanceDayTransactions.orderBy('date_time').toArray();
  const txFound = attDaysTxs.find((ad) => ad.id === syncResp.last_sync_id);

  let pendingTxs: AttendanceDayTransaction[] = [];
  if (txFound !== undefined) {
    pendingTxs = attDaysTxs.filter((tx) => tx.date_time > txFound.date_time);
  } else {
    pendingTxs = attDaysTxs;
  }

  if (pendingTxs.length === 0) {
    console.info('No ATTENDANCEDAYS txs to sync, skipping.');
    return;
  }
  console.info(`Syncing ${pendingTxs.length} ATTENDANCEDAYS txs.`);
  syncResp = await saveAttendanceDays(pendingTxs);
  const toDeleteIds = attDaysTxs
    .filter((tx) => tx.id !== syncResp.last_sync_id)
    .map((tx) => tx.id);
  await db.attendanceDayTransactions.bulkDelete(toDeleteIds);
};

export const donwloadAndSyncAttendanceDays = async () => {
  const { store } = useStore;
  const serverAttDays = await getAttendanceDays(store.yearId);
  const localAttDays = await db.attendanceDays.toArray();
  const notSavedServerAttDays = serverAttDays.filter((serverAttDay) => {
    return !localAttDays.some((localAttDay) => localAttDay.id === serverAttDay.id);
  });
  console.log(`Saving ${notSavedServerAttDays.length} ATTENDANCEDAYS from server!`);
  await db.attendanceDays.bulkAdd(notSavedServerAttDays);
};
