import ky from "ky";

import { API_URL } from "@app/utils/constants";
import { getToken } from "@app/utils/functions";

export const api = ky.extend({
	prefixUrl: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	hooks: {
		beforeRequest: [
			(request) => {
				const tokenStr = getToken();
				if (tokenStr !== null) {
					request.headers.set("Authorization", tokenStr);
				}
			},
		],
	},
});
