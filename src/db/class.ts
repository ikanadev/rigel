import { db } from './dexie';
import { getClasses } from '@app/api';

export const syncClasses = async (): Promise<void> => {
  const classes = await getClasses();
  const localClasses = await db.classes.toArray();
  const missingClasses = classes.filter((c) => {
    return !localClasses.some((lc) => lc.id === c.id);
  });
  if (missingClasses.length > 0) {
    void db.classes.bulkAdd(missingClasses);
  }
};
