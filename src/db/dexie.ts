import type {
  Teacher,
  YearData,
  Subject,
  Grade,
  ClassData,
  Student,
  StudentTransaction,
  ClassPeriod,
  ClassPeriodTransaction,
  AttendanceDay,
  AttendanceDayTransaction,
  Attendance,
  AttendanceTransaction,
  Activity,
  ActivityTransaction,
  Score,
  ScoreTransaction,
  AppError,
} from '@app/types';

import Dexie from 'dexie';
import { DB_NAME, DB_VERSION } from '@app/utils/constants';

class AulecaStore extends Dexie {
  teachers!: Dexie.Table<Teacher, string>;
  subjects!: Dexie.Table<Subject, string>;
  grades!: Dexie.Table<Grade, string>;
  years!: Dexie.Table<YearData, string>;
  classes!: Dexie.Table<ClassData, string>;
  students!: Dexie.Table<Student, string>;
  studentTransactions!: Dexie.Table<StudentTransaction, string>;
  classPeriods!: Dexie.Table<ClassPeriod, string>;
  classPeriodTransactions!: Dexie.Table<ClassPeriodTransaction, string>;
  attendanceDays!: Dexie.Table<AttendanceDay, string>;
  attendanceDayTransactions!: Dexie.Table<AttendanceDayTransaction, string>;
  attendances!: Dexie.Table<Attendance, string>;
  attendanceTransactions!: Dexie.Table<AttendanceTransaction, string>;
  activities!: Dexie.Table<Activity, string>;
  activityTransactions!: Dexie.Table<ActivityTransaction, string>;
  scores!: Dexie.Table<Score, string>;
  scoreTransactions!: Dexie.Table<ScoreTransaction, string>;
  errors!: Dexie.Table<AppError, string>;

  constructor() {
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
      attendanceDays: 'id, day, class_period_id',
      attendanceDayTransactions: 'id, type, date_time',
      attendances: 'id, value, attendance_day_id, student_id',
      attendanceTransactions: 'id, type, date_time',
      activities: 'id, name, [area_id+class_period_id], class_period_id, date',
      activityTransactions: 'id, type, date_time',
      scores: 'id, student_id, activity_id, points',
      scoreTransactions: 'id, type, date_time',
      errors: 'id, user_id',
    });
  }
}

export const db = new AulecaStore();
