import {
	Activity,
	ActivityUpdate,
	ActivityTransaction,
	DbOperation,
} from "@app/types";

import { nanoid } from "nanoid";
import { db } from "./dexie";

export const addActivity = (activity: Activity) => {
	return db.transaction(
		"rw",
		[db.activities, db.activityTransactions],
		async () => {
			const transaction: ActivityTransaction = {
				id: nanoid(),
				type: DbOperation.Insert,
				data: activity,
				date_time: Date.now(),
			};
			await db.activities.add(activity);
			await db.activityTransactions.add(transaction);
		},
	);
};

export const updateActivity = (data: ActivityUpdate) => {
	return db.transaction(
		"rw",
		[db.activities, db.activityTransactions],
		async () => {
			const transaction: ActivityTransaction = {
				id: nanoid(),
				type: DbOperation.Update,
				data,
				date_time: Date.now(),
			};
			const { id, ...toUpdate } = data;
			await db.activities.update(id, toUpdate);
			await db.activityTransactions.add(transaction);
		},
	);
};
