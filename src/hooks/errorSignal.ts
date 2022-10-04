import { createSignal, createRoot } from 'solid-js';
import { saveAppError } from '@app/db/appErrors';
import { db } from '@app/db/dexie';

const errorSignal = () => {
  const [errMsg, setErrMsg] = createSignal('');

  const reportError = async (cause: string, err: unknown) => {
    setErrMsg('Un error inesperado ha ocurrido. Por favor reinicia la webapp.');
    const teachers = await db.teachers.toArray();
    let userId = '-';
    if (teachers.length > 0) {
      userId = teachers[0].id;
    }
    await saveAppError(userId, cause, err);
  };
  const clearError = () => {
    setErrMsg('');
  };

  return {
    reportError,
    clearError,
    errMsg,
  };
};

export default createRoot(errorSignal);
