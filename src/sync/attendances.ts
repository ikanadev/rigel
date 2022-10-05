import { db } from '@app/db/dexie';
import { log } from '@app/utils/functions';
import { getAttendances, saveAttendances } from './ky';
import useStore from './store';

export const syncAttendances = async () => {
  const attTxs = await db.attendanceTransactions.orderBy('date_time').toArray();

  if (attTxs.length === 0) {
    log('No ATTENDANCES txs to sync, skipping.');
    return;
  }
  log(`Syncing ${attTxs.length} ATTENDANCES txs.`);
  await saveAttendances(attTxs);
  const toDeleteIds = attTxs.map((tx) => tx.id);
  await db.attendanceTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncAttendances = async () => {
  const { store } = useStore;
  const serverAtts = await getAttendances(store.yearId);
  const localAtts = await db.attendances.toArray();
  const notSavedServerAtts = serverAtts.filter((serverAtt) => {
    return !localAtts.some((localAtt) => localAtt.id === serverAtt.id);
  });
  log(`Saving ${notSavedServerAtts.length} ATTENDANCES from server!`);
  await db.attendances.bulkAdd(notSavedServerAtts);
};
