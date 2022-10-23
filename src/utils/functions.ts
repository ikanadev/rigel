import { EMAIL_REGEX, JWT_KEY } from './constants';

export const getToken = (): string | null => localStorage.getItem(JWT_KEY);

// @ts-expect-error
export const log = (...items) => {
  if (import.meta.env.DEV) {
    console.log(...items);
  }
};

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
  try {
    // @ts-expect-error
    let resp = error.response;
    resp = await resp.json();
    return resp.message;
  } catch (err) {
    throw error;
  }
};

// returns the default font size or 0 if it's not possible to get it
export const getDefaultFontSize = () => {
  const element = document.createElement('div');
  element.style.width = '1rem';
  element.style.display = 'none';
  document.body.append(element);

  const widthMatch = window
    .getComputedStyle(element)
    .getPropertyValue('width')
    .match(/\d+/);

  element.remove();

  if (widthMatch === null || widthMatch.length < 1) {
    return 0;
  }

  const result = Number(widthMatch[0]);
  return !isNaN(result) ? result : 0;
};
