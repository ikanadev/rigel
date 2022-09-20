import type { JSX } from 'solid-js';

export interface Municipio {
  id: number
  name: string
}

export interface Provincia {
  id: number
  name: string
}

export interface Departamento {
  id: number
  name: string
}

export interface School {
  id: number
  name: string
  lat: string
  lon: string
}

export interface Teacher {
  id: string
  name: string
  last_name: string
  email: string
  password: string
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
  edges: {
    periods: Period[]
    areas: Area[]
  }
}

export interface Class {
  id: string
  parallel: string
  edges: {
    subject: Subject
    grade: Grade
    year: Omit<Year, 'edges'>
  }
}

export interface ClassPeriod {
  id: string
  class_id: string
  start: string
  end: string
  finished: boolean
  period: Period
}
// there is no edit, just "finish" where we update the end and finished property
export type ClassPeriodUpdate = Pick<ClassPeriod, 'id' | 'end' | 'finished'>;
export interface ClassPeriodTransaction {
  id: string
  type: DbOperation
  // only create and update
  data: ClassPeriod | ClassPeriodUpdate
  date_time: string
}

export interface Student {
  id: string
  name: string
  last_name: string
  ci: string
  class_id: string
}
export type StudentUpdate = Omit<Student, 'class_id'>;
export interface StudentTransaction {
  id: string
  type: DbOperation
  data: Student | StudentUpdate | string
  date_time: string
}

// App
export interface InputState {
  value: string
  errorMsg: string
  isTouched: boolean
}

export enum DbOperation {
  Insert = 'INSERT',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

export type FormSubmitHandler = JSX.EventHandlerUnion<HTMLFormElement, Event & { submitter: HTMLElement }>;
