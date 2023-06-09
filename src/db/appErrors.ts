import { AppError } from "@app/types";

import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { saveAppErrors } from "@app/api";
import { LAST_ERR_SYNC_KEY } from "@app/utils/constants";
import { db } from "./dexie";

export const saveAppError = async (
	userId: string,
	cause: string,
	err: unknown,
) => {
	let errorMsg = String(err);
	let errorStack = "No stack";
	if (err instanceof Error) {
		errorMsg = err.message;
		errorStack = err.stack ?? "No stack";
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

export const sendAppErrorsToServer = async () => {
	let syncNow = false;
	const errSyncStr = localStorage.getItem(LAST_ERR_SYNC_KEY);
	if (errSyncStr === null) {
		syncNow = true;
	} else {
		const daysDiff = dayjs().diff(dayjs(parseInt(errSyncStr)), "day");
		if (daysDiff > 1) {
			syncNow = true;
		}
	}
	if (syncNow) {
		const localAppErrors = await db.errors.toArray();
		await saveAppErrors(localAppErrors);
		localStorage.setItem(LAST_ERR_SYNC_KEY, Date.now().toString());
		await db.errors.clear();
	}
};
