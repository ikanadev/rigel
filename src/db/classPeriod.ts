import { ClassPeriod, ClassPeriodTransaction, ClassPeriodUpdate, DbOperation } from '@app/types';

import { db } from './dexie';
import { nanoid } from 'nanoid';

export const startClassPeriod = (classPeriod: ClassPeriod) => {
  return db.transaction('rw', [db.classPeriods, db.classPeriodTransactions], async () => {
    const transaction: ClassPeriodTransaction = {
      id: nanoid(),
      type: DbOperation.Insert,
      data: classPeriod,
      date_time: new Date().toISOString(),
    };
    await db.classPeriods.add(classPeriod);
    await db.classPeriodTransactions.add(transaction);
  });
};

export const finishClassPeriod = (data: ClassPeriodUpdate) => {
  return db.transaction('rw', [db.classPeriods, db.classPeriodTransactions], async () => {
    const transaction: ClassPeriodTransaction = {
      id: nanoid(),
      type: DbOperation.Update,
      data,
      date_time: new Date().toISOString(),
    };
    const { id, ...changes } = data;
    await db.classPeriods.update(id, changes);
    await db.classPeriodTransactions.add(transaction);
  });
};
