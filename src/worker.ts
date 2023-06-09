import {
	SYNC_DATA_MSG,
	SET_DATA_MSG,
	DOWNLOAD_AND_SYNC_MSG,
	EXIT_MESSAGE,
} from "@app/utils/constants";
import { setData, downloadAndSync, syncApp, stopSyncs } from "@app/sync";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare let self: WorkerGlobalScope;

onmessage = (ev) => {
	switch (ev.data.type) {
		case SET_DATA_MSG: {
			setData(ev.data.jwt, ev.data.yearId);
			break;
		}
		case DOWNLOAD_AND_SYNC_MSG: {
			downloadAndSync();
			break;
		}
		case SYNC_DATA_MSG: {
			syncApp();
			break;
		}
		case EXIT_MESSAGE: {
			stopSyncs();
			break;
		}
	}
};
