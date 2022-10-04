import { db } from '@app/db/dexie';
import { getActivities, saveActivities } from './ky';
import useStore from './store';

export const syncActivities = async () => {
  const actTxs = await db.activityTransactions.orderBy('date_time').toArray();

  if (actTxs.length === 0) {
    console.info('No ACTIVITIES txs to sync, skipping.');
    return;
  }
  console.info(`Syncing ${actTxs.length} ACTIVITIES txs.`);
  await saveActivities(actTxs);
  const toDeleteIds = actTxs.map((tx) => tx.id);
  await db.activityTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncActivities = async () => {
  const { store } = useStore;
  const serverActs = await getActivities(store.yearId);
  const localActs = await db.activities.toArray();
  const notSavedServerActs = serverActs.filter((serverAct) => {
    return !localActs.some((localAct) => localAct.id === serverAct.id);
  });
  console.log(`Saving ${notSavedServerActs.length} ACTIVITIES from server!`);
  await db.activities.bulkAdd(notSavedServerActs);
};
