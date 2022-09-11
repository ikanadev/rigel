import { api } from './api';

interface SignUpReq {
  name: string
  lastName: string
  email: string
  password: string
}
export const signUp = async (data: SignUpReq): Promise<void> => {
  await api.post('signup', { json: data });
};
