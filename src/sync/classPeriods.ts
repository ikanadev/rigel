import { db } from '@app/db/dexie';
import { log } from '@app/utils/functions';
import { saveClassPeriods, getClassPeriods } from './ky';
import { getToUpdateItems, getToDeleteIds } from './helpers';
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

  const toDelete = getToDeleteIds(localClassPeriods, serverClassPeriods);
  if (toDelete.length > 0) {
    await db.classPeriods.bulkDelete(toDelete);
  }

  const toUpdate = getToUpdateItems(localClassPeriods, serverClassPeriods);
  if (toUpdate.length > 0) {
    await db.classPeriods.bulkPut(toUpdate);
  }
};
