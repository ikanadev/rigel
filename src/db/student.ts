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

export const addStudents = (students: Student[], classId: string) => {
  const txs: StudentTransaction[] = [];
  const studentsToSave: Student[] = students.map(st => {
    // we change the id, since we are copying students from other subject
    const newStudent: Student = {
      ...st,
      id: nanoid(),
      class_id: classId,
    };
    txs.push({
      id: nanoid(),
      type: DbOperation.Insert,
      data: newStudent,
      date_time: Date.now(),
    });
    return newStudent;
  });
  return db.transaction('rw', [db.students, db.studentTransactions], async () => {
    await db.students.bulkAdd(studentsToSave);
    await db.studentTransactions.bulkAdd(txs);
  });
};
