import { db } from "@app/db/dexie";
import { log } from "@app/utils/functions";
import { saveScores, getScores } from "./ky";
import { getToUpdateItems, getToDeleteIds } from "./helpers";
import useStore from "./store";

export const syncScores = async () => {
	const scoreTxs = await db.scoreTransactions.orderBy("date_time").toArray();

	if (scoreTxs.length === 0) {
		log("No SCORES txs to sync, skipping.");
		return;
	}
	log(`Syncing ${scoreTxs.length} SCORES txs.`);
	await saveScores(scoreTxs);
	const toDeleteIds = scoreTxs.map((tx) => tx.id);
	await db.scoreTransactions.bulkDelete(toDeleteIds);
};

export const downloadAndSyncScores = async () => {
	const { store } = useStore;
	const serverScores = await getScores(store.yearId);
	const localScores = await db.scores.toArray();

	const toDelete = getToDeleteIds(localScores, serverScores);
	if (toDelete.length > 0) {
		await db.scores.bulkDelete(toDelete);
	}

	const toUpdate = getToUpdateItems(localScores, serverScores);
	if (toUpdate.length > 0) {
		await db.scores.bulkPut(toUpdate);
	}
};
