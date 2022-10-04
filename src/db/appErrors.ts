import { AppError } from '@app/types';

import { db } from './dexie';
import { nanoid } from 'nanoid';

export const saveAppError = async (userId: string, cause: string, err: unknown) => {
  let errorMsg = String(err);
  let errorStack = 'No stack';
  if (err instanceof Error) {
    errorMsg = err.message;
    errorStack = err.stack ?? 'No stack';
  }
  const appError: AppError = {
    id: nanoid(),
    user_id: userId,
    cause,
    error_msg: errorMsg,
    error_stack: errorStack,
  };
  await db.errors.add(appError);
};
