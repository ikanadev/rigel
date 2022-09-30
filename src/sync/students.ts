import { db } from '@app/db/dexie';
import { saveStudents, getStudents } from './ky';
import useStore from './store';

export const syncStudents = async () => {
  const studentTxs = await db.studentTransactions.orderBy('date_time').toArray();
  if (studentTxs.length === 0) {
    console.info('No STUDENT txs to sync, skipping.');
    return;
  }
  console.info(`Syncing ${studentTxs.length} STUDENT txs.`);
  await saveStudents(studentTxs);
  const toDeleteIds = studentTxs.map((st) => st.id);
  await db.studentTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncStudents = async () => {
  const { store } = useStore;
  const serverStudents = await getStudents(store.yearId);
  const localStudents = await db.students.toArray();
  const notSavedServerStudents = serverStudents.filter((ss) => {
    return !localStudents.some((ls) => ls.id === ss.id);
  });
  console.info(`Saving ${notSavedServerStudents.length} students from server!`);
  await db.students.bulkAdd(notSavedServerStudents);
};
