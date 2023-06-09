import { db } from "@app/db/dexie";
import { log } from "@app/utils/functions";
import { getAttendanceDays, saveAttendanceDays } from "./ky";
import { getToDeleteIds, getToUpdateItems } from "./helpers";
import useStore from "./store";

export const syncAttendanceDays = async () => {
	const attDaysTxs = await db.attendanceDayTransactions
		.orderBy("date_time")
		.toArray();

	if (attDaysTxs.length === 0) {
		log("No ATTENDANCEDAYS txs to sync, skipping.");
		return;
	}
	log(`Syncing ${attDaysTxs.length} ATTENDANCEDAYS txs.`);
	await saveAttendanceDays(attDaysTxs);
	const toDeleteIds = attDaysTxs.map((tx) => tx.id);
	await db.attendanceDayTransactions.bulkDelete(toDeleteIds);
};

export const donwloadAndSyncAttendanceDays = async () => {
	const { store } = useStore;
	const serverAttDays = await getAttendanceDays(store.yearId);
	const localAttDays = await db.attendanceDays.toArray();

	const toDelete = getToDeleteIds(localAttDays, serverAttDays);
	if (toDelete.length > 0) {
		await db.attendanceDays.bulkDelete(toDelete);
	}

	const toUpdate = getToUpdateItems(localAttDays, serverAttDays);
	if (toUpdate.length > 0) {
		await db.attendanceDays.bulkPut(toUpdate);
	}
};
