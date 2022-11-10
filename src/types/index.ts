import type { JSX } from 'solid-js';

// Simple entities
export interface Municipio {
  id: string
  name: string
}
export interface Provincia {
  id: string
  name: string
}
export interface Departamento {
  id: string
  name: string
}
export interface School {
  id: string
  name: string
  lat: string
  lon: string
}
export interface Teacher {
  id: string
  name: string
  last_name: string
  email: string
}
export interface Subject {
  id: string
  name: string
}
export interface Grade {
  id: string
  name: string
}
export interface Period {
  id: string
  name: string
}
export interface Area {
  id: string
  name: string
  points: number
}
export interface Year {
  id: string
  value: number
}
export interface Class {
  id: string
  parallel: string
}

// composed entities
export interface YearData extends Year {
  periods: Period[]
  areas: Area[]
}
export interface ClassData extends Class {
  subject: Subject
  grade: Grade
  year: Year
}

// Local db
export interface Transaction {
  id: string
  type: DbOperation
  date_time: number
}

export interface ClassPeriod {
  id: string
  class_id: string
  start: number
  end: number
  finished: boolean
  period: Period
}
// there is no edit, just "finish" where we update the end and finished property
export type ClassPeriodUpdate = Pick<ClassPeriod, 'id' | 'end' | 'finished'>;
export interface ClassPeriodTransaction extends Transaction {
  // only create and update
  data: ClassPeriod | ClassPeriodUpdate
}

export interface Student {
  id: string
  name: string
  last_name: string
  ci: string
  class_id: string
}
export type StudentUpdate = Omit<Student, 'class_id'>;
export interface StudentTransaction extends Transaction {
  data: Student | StudentUpdate | string
}

export interface AttendanceDay {
  id: string
  day: number
  class_period_id: string
}
export interface AttendanceDayTransaction extends Transaction {
  // only create
  data: AttendanceDay
}

export interface Attendance {
  id: string
  value: AttendanceStatus
  attendance_day_id: string
  student_id: string
}
export type AttendanceUpdate = Pick<Attendance, 'id' | 'value'>;
export interface AttendanceTransaction extends Transaction {
  data: Attendance | AttendanceUpdate
}

export interface Activity {
  id: string
  name: string
  class_period_id: string
  area_id: string
  date: number
}
export type ActivityUpdate = Pick<Activity, 'id' | 'name' | 'area_id'>;
export interface ActivityTransaction extends Transaction {
  data: Activity | ActivityUpdate
}

export interface Score {
  id: string
  student_id: string
  activity_id: string
  points: number
}
export type ScoreUpdate = Pick<Score, 'id' | 'points'>;
export interface ScoreTransaction extends Transaction {
  data: Score | ScoreUpdate
}

// App
export interface InputState {
  value: string
  errorMsg: string
  isTouched: boolean
}

export interface AppError {
  id: string
  user_id: string
  cause: string
  error_msg: string
  error_stack: string
}

export enum DbOperation {
  Insert = 'INSERT',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

export enum AttendanceStatus {
  P = 'Presente',
  F = 'Falta',
  A = 'Atraso',
  L = 'Licencia',
}

export type TotalAttendances = {
  [key in AttendanceStatus]: number
};

export interface XMLData {
  [key: string]: Array<string[] | null>
}

export type FormSubmitHandler = JSX.EventHandlerUnion<HTMLFormElement, Event & { submitter: HTMLElement }>;
export type OnInputEvent = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
export type OnChangeEvent = JSX.EventHandlerUnion<HTMLInputElement, Event>;
