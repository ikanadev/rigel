import type { Class } from '@app/types';

import { db } from './dexie';
import { getClasses } from '@app/api';

/**
* Compares classesToSync items (or does a server request if not provided) against local items and saves the missing ones
*/
export const syncClasses = async (classesToSync?: Class[]): Promise<void> => {
  let classes: Class[] = [];
  if (classesToSync === undefined) {
    classes = await getClasses();
  } else {
    classes = classesToSync;
  }
  const localClasses = await db.classes.toArray();
  const missingClasses = classes.filter((c) => {
    return !localClasses.some((lc) => lc.id === c.id);
  });
  if (missingClasses.length > 0) {
    void db.classes.bulkAdd(missingClasses);
  }
};
