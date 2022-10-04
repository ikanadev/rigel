import { Score, ScoreUpdate, ScoreTransaction, DbOperation } from '@app/types';

import { nanoid } from 'nanoid';
import { db } from './dexie';

export const addScore = (score: Score) => {
  return db.transaction('rw', [db.scores, db.scoreTransactions], async () => {
    const tx: ScoreTransaction = {
      id: nanoid(),
      type: DbOperation.Insert,
      data: score,
      date_time: Date.now(),
    };
    await db.scores.add(score);
    await db.scoreTransactions.add(tx);
  });
};

export const updateScore = (data: ScoreUpdate) => {
  return db.transaction('rw', [db.scores, db.scoreTransactions], async () => {
    const tx: ScoreTransaction = {
      id: nanoid(),
      type: DbOperation.Update,
      data,
      date_time: Date.now(),
    };
    const { id, ...toUpdate } = data;
    await db.scores.update(id, toUpdate);
    await db.scoreTransactions.add(tx);
  });
};
