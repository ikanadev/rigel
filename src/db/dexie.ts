import type {
  Teacher,
  Year,
  Subject,
  Grade,
  Class,
  Student,
  StudentTransaction,
  ClassPeriod,
  ClassPeriodTransaction,
} from '@app/types';

import Dexie from 'dexie';
import { DB_NAME, DB_VERSION } from '@app/utils/constants';

class RigelStore extends Dexie {
  teachers!: Dexie.Table<Teacher, string>;
  subjects!: Dexie.Table<Subject, string>;
  grades!: Dexie.Table<Grade, string>;
  years!: Dexie.Table<Year, string>;
  classes!: Dexie.Table<Class, string>;
  students!: Dexie.Table<Student, string>;
  studentTransactions!: Dexie.Table<StudentTransaction, string>;
  classPeriods!: Dexie.Table<ClassPeriod, string>;
  classPeriodTransactions!: Dexie.Table<ClassPeriodTransaction, string>;

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
      classPeriods: 'id, start, end, finished, class_id, period_id',
      classPeriodTransactions: 'id, type, date_time',
    });
  }
}

export const db = new RigelStore();
