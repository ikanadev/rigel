import { EMAIL_REGEX } from './constants';

export const getToken = (): string | null => localStorage.getItem('token');

// Form validators
export const nonEmptyValidator = (val: string): string => {
  if (val.trim() === '') return 'Campo requerido';
  return '';
};
export const emailValidator = (val: string): string => {
  return EMAIL_REGEX.test(val) ? '' : 'Correo no válido';
};
export const minLenValidator = (len: number) => (val: string) => {
  return val.length >= len ? '' : `Se requiere al menos ${len} caracteres`;
};

// Verify http error
export const getErrorMsg = async (error: unknown): Promise<string> => {
  // @ts-expect-error
  let resp = error.response;
  resp = await resp.json();
  return resp.message;
};
