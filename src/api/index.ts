import { api } from './api';

import type { Teacher, Year, Grade, Subject, Class } from '@app/types';

interface SignUpReq {
  name: string
  lastName: string
  email: string
  password: string
}
export const signUp = async (data: SignUpReq): Promise<void> => {
  await api.post('signup', { json: data });
};

interface SignInReq {
  email: string
  password: string
}
interface SignInRes {
  teacher: Teacher
  jwt: string
}
export const signIn = async (data: SignInReq): Promise<SignInRes> => {
  const resp = await api.post('signin', { json: data });
  return await resp.json();
};

export const getYears = async (): Promise<Year[]> => {
  const resp = await api.get('years');
  return await resp.json();
};

interface GetGradesAndSubjectsRes {
  grades: Grade[]
  subjects: Subject[]
}
export const getGradesAndSubjects = async (): Promise<GetGradesAndSubjectsRes> => {
  const resp = await api.get('static');
  return await resp.json();
};

export const getClasses = async (): Promise<Class[]> => {
  const resp = await api.get('auth/classes');
  return await resp.json();
};
