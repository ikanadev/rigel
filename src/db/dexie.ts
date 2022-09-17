import type {
  Teacher,
  Year,
  Subject,
  Grade,
  Class,
  Student,
  StudentTransaction,
} from '@app/types';

import Dexie from 'dexie';
import { DB_NAME, DB_VERSION } from '@app/utils/constants';

class RigelStore extends Dexie {
  // @ts-expect-error
  teachers: Dexie.Table<Teacher, string>;
  // @ts-expect-error
  subjects: Dexie.Table<Subject, string>;
  // @ts-expect-error
  grades: Dexie.Table<Grade, string>;
  // @ts-expect-error
  years: Dexie.Table<Year, string>;
  // @ts-expect-error
  classes: Dexie.Table<Class, string>;
  // @ts-expect-error
  students: Dexie.Table<Student, string>;
  // @ts-expect-error
  studentTransactions: Dexie.Table<StudentTransaction, string>;

  constructor () {
    super(DB_NAME);
    this.version(DB_VERSION).stores({
      teachers: 'id, email',
      subjects: 'id, name',
      grades: 'id, name',
      years: 'id, value',
      classes: 'id, parallel',
      students: 'id, name, last_name, class_id',
      studentTransactions: 'id, type, date_time',
    });
  }
}

export const db = new RigelStore();
