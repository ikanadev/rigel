import { Student, StudentUpdate, StudentTransaction, DbOperation } from '@app/types';

import { nanoid } from 'nanoid';
import { db } from './dexie';

export const addStudent = (student: Student) => {
  return db.transaction('rw', [db.students, db.studentTransactions], async () => {
    const transaction: StudentTransaction = {
      id: nanoid(),
      type: DbOperation.Insert,
      data: student,
      date_time: Date.now(),
    };
    await db.students.add(student);
    await db.studentTransactions.add(transaction);
  });
};

export const updateStudent = (studentUpdate: StudentUpdate) => {
  return db.transaction('rw', [db.students, db.studentTransactions], async () => {
    const transaction: StudentTransaction = {
      id: nanoid(),
      type: DbOperation.Update,
      data: studentUpdate,
      date_time: Date.now(),
    };
    const { id, ...changes } = studentUpdate;
    await db.students.update(id, changes);
    await db.studentTransactions.add(transaction);
  });
};
