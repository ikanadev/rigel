import { db } from "@app/db/dexie";
import { log } from "@app/utils/functions";
import { getActivities, saveActivities } from "./ky";
import { getToDeleteIds, getToUpdateItems } from "./helpers";
import useStore from "./store";

export const syncActivities = async () => {
	const actTxs = await db.activityTransactions.orderBy("date_time").toArray();

	if (actTxs.length === 0) {
		log("No ACTIVITIES txs to sync, skipping.");
		return;
	}
	log(`Syncing ${actTxs.length} ACTIVITIES txs.`);
	await saveActivities(actTxs);
	const toDeleteIds = actTxs.map((tx) => tx.id);
	await db.activityTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncActivities = async () => {
	const { store } = useStore;
	const serverActs = await getActivities(store.yearId);
	const localActs = await db.activities.toArray();

	// Delete unknown acts
	const toDelete = getToDeleteIds(localActs, serverActs);
	if (toDelete.length > 0) {
		await db.activities.bulkDelete(toDelete);
	}

	// Update acts
	const toUpdate = getToUpdateItems(localActs, serverActs);
	if (toUpdate.length > 0) {
		await db.activities.bulkPut(toUpdate);
	}
};
