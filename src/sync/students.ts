import { db } from "@app/db/dexie";
import { log } from "@app/utils/functions";
import { saveStudents, getStudents } from "./ky";
import { getToUpdateItems, getToDeleteIds } from "./helpers";
import useStore from "./store";

export const syncStudents = async () => {
	const studentTxs = await db.studentTransactions
		.orderBy("date_time")
		.toArray();
	if (studentTxs.length === 0) {
		log("No STUDENT txs to sync, skipping.");
		return;
	}
	log(`Syncing ${studentTxs.length} STUDENT txs.`);
	await saveStudents(studentTxs);
	const toDeleteIds = studentTxs.map((st) => st.id);
	await db.studentTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncStudents = async () => {
	const { store } = useStore;
	const serverStudents = await getStudents(store.yearId);
	const localStudents = await db.students.toArray();

	const toDelete = getToDeleteIds(localStudents, serverStudents);
	if (toDelete.length > 0) {
		await db.students.bulkDelete(toDelete);
	}

	const toUpdate = getToUpdateItems(localStudents, serverStudents);
	if (toUpdate.length > 0) {
		await db.students.bulkPut(toUpdate);
	}
};
