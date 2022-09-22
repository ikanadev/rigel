import { Attendance, AttendanceUpdate, AttendanceTransaction, DbOperation } from '@app/types';

import { nanoid } from 'nanoid';
import { db } from './dexie';

export const addAttendance = (att: Attendance) => {
  return db.transaction('rw', [db.attendances, db.attendanceTransactions], async () => {
    const transaction: AttendanceTransaction = {
      id: nanoid(),
      type: DbOperation.Insert,
      data: att,
      date_time: new Date().toISOString(),
    };
    await db.attendances.add(att);
    await db.attendanceTransactions.add(transaction);
  });
};

export const updateAttendance = (data: AttendanceUpdate) => {
  return db.transaction('rw', [db.attendances, db.attendanceTransactions], async () => {
    const transaction: AttendanceTransaction = {
      id: nanoid(),
      type: DbOperation.Update,
      data,
      date_time: new Date().toISOString(),
    };
    const { id, ...toUpdate } = data;
    await db.attendances.update(id, toUpdate);
    await db.attendanceTransactions.add(transaction);
  });
};
