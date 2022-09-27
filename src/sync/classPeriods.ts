import { ClassPeriodTransaction } from '@app/types';

import { db } from '@app/db/dexie';
import { classPeriodSync, saveClassPeriods, getClassPeriods } from './ky';
import useStore from './store';

export const syncClassPeriods = async () => {
  let syncResp = await classPeriodSync();
  const classPeriodTxs = await db.classPeriodTransactions.orderBy('date_time').toArray();
  const txFound = classPeriodTxs.find((cp) => cp.id === syncResp.last_sync_id);

  let pendingTxs: ClassPeriodTransaction[] = [];
  if (txFound !== undefined) {
    pendingTxs = classPeriodTxs.filter((cpTx) => cpTx.date_time > txFound.date_time);
  } else {
    pendingTxs = classPeriodTxs;
  }

  if (pendingTxs.length === 0) {
    console.info('No CLASSPERIODS txs to sync, skipping.');
    return;
  }
  console.info(`Syncing ${pendingTxs.length} CLASSPERIODS txs.`);
  syncResp = await saveClassPeriods(pendingTxs);
  const toDeleteIds = classPeriodTxs
    .filter((cpTx) => cpTx.id !== syncResp.last_sync_id)
    .map((cpTx) => cpTx.id);
  await db.classPeriodTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncClassPeriods = async () => {
  const { store } = useStore;
  const serverClassPeriods = await getClassPeriods(store.yearId);
  const localClassPeriods = await db.classPeriods.toArray();
  const notSavedServerClassPeriods = serverClassPeriods.filter((serverCp) => {
    return !localClassPeriods.some((localCp) => localCp.id === serverCp.id);
  });
  console.info(`Saving ${notSavedServerClassPeriods.length} classPeriods from server!`);
  await db.classPeriods.bulkAdd(notSavedServerClassPeriods);
};
