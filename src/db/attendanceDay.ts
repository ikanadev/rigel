import {
	AttendanceDay,
	AttendanceDayTransaction,
	DbOperation,
} from "@app/types";

import { nanoid } from "nanoid";
import { db } from "./dexie";

export const addAttendanceDay = (attDay: AttendanceDay) => {
	return db.transaction(
		"rw",
		[db.attendanceDays, db.attendanceDayTransactions],
		async () => {
			const transaction: AttendanceDayTransaction = {
				id: nanoid(),
				type: DbOperation.Insert,
				data: attDay,
				date_time: Date.now(),
			};
			await db.attendanceDays.add(attDay);
			await db.attendanceDayTransactions.add(transaction);
		},
	);
};
