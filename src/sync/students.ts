import { StudentTransaction } from '@app/types';

import { db } from '@app/db/dexie';
import { studentSync, saveStudents } from './ky';

const syncStudents = async () => {
  let resp = await studentSync();
  const studentTxs = await db.studentTransactions.orderBy('date_time').reverse().toArray();
  const found = studentTxs.find((st) => st.id === resp.last_sync_id);

  let pendingTxs: StudentTransaction[] = [];
  if (found !== undefined) {
    pendingTxs = studentTxs.filter((st) => st.date_time > found.date_time);
  } else {
    pendingTxs = studentTxs;
  }
  if (pendingTxs.length === 0) {
    console.info('No STUDENT txs to sync, skipping.');
    return;
  }
  console.info(`Syncing ${pendingTxs.length} STUDENT txs.`);
  resp = await saveStudents(pendingTxs);
  const toDeleteIds = studentTxs.filter((st) => st.id !== resp.last_sync_id).map((st) => st.id);
  await db.studentTransactions.bulkDelete(toDeleteIds);
};

export default syncStudents;
