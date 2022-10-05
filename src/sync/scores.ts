import { db } from '@app/db/dexie';
import { log } from '@app/utils/functions';
import { saveScores, getScores } from './ky';
import useStore from './store';

export const syncScores = async () => {
  const scoreTxs = await db.scoreTransactions.orderBy('date_time').toArray();

  if (scoreTxs.length === 0) {
    log('No SCORES txs to sync, skipping.');
    return;
  }
  log(`Syncing ${scoreTxs.length} SCORES txs.`);
  await saveScores(scoreTxs);
  const toDeleteIds = scoreTxs.map((tx) => tx.id);
  await db.scoreTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncScores = async () => {
  const { store } = useStore;
  const serverScores = await getScores(store.yearId);
  const localScores = await db.scores.toArray();
  const notSavedServerScores = serverScores.filter((serverScore) => {
    return !localScores.some((localScore) => localScore.id === serverScore.id);
  });
  log(`Saving ${notSavedServerScores.length} SCORES from server!`);
  await db.scores.bulkAdd(notSavedServerScores);
};
