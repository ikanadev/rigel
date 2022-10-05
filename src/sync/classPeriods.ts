import { db } from '@app/db/dexie';
import { log } from '@app/utils/functions';
import { saveClassPeriods, getClassPeriods } from './ky';
import useStore from './store';

export const syncClassPeriods = async () => {
  const classPeriodTxs = await db.classPeriodTransactions.orderBy('date_time').toArray();

  if (classPeriodTxs.length === 0) {
    log('No CLASSPERIODS txs to sync, skipping.');
    return;
  }
  log(`Syncing ${classPeriodTxs.length} CLASSPERIODS txs.`);
  await saveClassPeriods(classPeriodTxs);
  const toDeleteIds = classPeriodTxs.map((cpTx) => cpTx.id);
  await db.classPeriodTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncClassPeriods = async () => {
  const { store } = useStore;
  const serverClassPeriods = await getClassPeriods(store.yearId);
  const localClassPeriods = await db.classPeriods.toArray();
  const notSavedServerClassPeriods = serverClassPeriods.filter((serverCp) => {
    return !localClassPeriods.some((localCp) => localCp.id === serverCp.id);
  });
  log(`Saving ${notSavedServerClassPeriods.length} classPeriods from server!`);
  await db.classPeriods.bulkAdd(notSavedServerClassPeriods);
};
