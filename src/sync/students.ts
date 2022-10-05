import { db } from '@app/db/dexie';
import { log } from '@app/utils/functions';
import { saveStudents, getStudents } from './ky';
import useStore from './store';

export const syncStudents = async () => {
  const studentTxs = await db.studentTransactions.orderBy('date_time').toArray();
  if (studentTxs.length === 0) {
    log('No STUDENT txs to sync, skipping.');
    return;
  }
  log(`Syncing ${studentTxs.length} STUDENT txs.`);
  await saveStudents(studentTxs);
  const toDeleteIds = studentTxs.map((st) => st.id);
  await db.studentTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncStudents = async () => {
  const { store } = useStore;
  const serverStudents = await getStudents(store.yearId);
  await db.students.bulkPut(serverStudents);
};
