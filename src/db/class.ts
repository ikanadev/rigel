import type { Class } from '@app/types';

import { db } from './dexie';
import { getClasses } from '@app/api';

/**
* Compares classesToSync items against local items and saves the missing ones
*/
export const syncClasses = async (classesToSync: Class[]): Promise<void> => {
  const localClasses = await db.classes.toArray();
  const missingClasses = classesToSync.filter((c) => {
    return !localClasses.some((lc) => lc.id === c.id);
  });
  if (missingClasses.length > 0) {
    void db.classes.bulkAdd(missingClasses);
  }
};

/** Fetchs provided year classes and save them in local data */
export const fetchAndSyncClasses = async (yearId: string): Promise<void> => {
  const classes = await getClasses(yearId);

  // Delete classes of other year
  const localClasses = db.classes.toCollection();
  const localClassesToDelete = localClasses.filter((c) => c.edges.year.id !== yearId);
  await localClassesToDelete.delete();

  // sync with local data
  await syncClasses(classes);
};
