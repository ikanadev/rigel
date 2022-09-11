import { api } from './api';

import type { Teacher } from '@app/types';

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
  const resp = api.post('signin', { json: data });
  return await resp.json();
};
