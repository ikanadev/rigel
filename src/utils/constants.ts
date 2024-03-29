import { AttendanceStatus } from "@app/types";

// Indexed DB
export const DB_NAME = "AULECA_LOCAL";
export const DB_VERSION = 20;

// App constants
export const APP_VERSION = "v1.0.0";
export const APP_NAME = "Auleca";
export const MAX_CLASSES_STANDARD = 4;
export const MAX_CLASSES_PREMIUM = 20;
export const TELEGRAM_LINK = "https://t.me/auleca";
export const APP_EMAIL = "aulecabo@gmail.com";
export const LANDING_PAGE = "https://auleca.com";
export const SET_DATA_MSG = "SET_DATA_MSG";
export const SYNC_DATA_MSG = "SYNC_DATA_MSG";
export const DOWNLOAD_AND_SYNC_MSG = "DOWNLOAD_AND_SYNC_MSG";
export const EXIT_MESSAGE = "EXIT_MESSAGE";
export const JWT_KEY = "jwt";
export const DEFAULT_CLASS_KEY = "default_class";
export const LAST_ERR_SYNC_KEY = "LAST_ERR_SYNC_KEY";
export const API_URL = import.meta.env.VITE_API_URL;
export const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// other
export const attendanceColors: {
	[key in AttendanceStatus]: { on: string; off: string };
} = {
	[AttendanceStatus.P]: { on: "$success10", off: "$success2" },
	[AttendanceStatus.F]: { on: "$danger10", off: "$danger2" },
	[AttendanceStatus.A]: { on: "$warning10", off: "$warning2" },
	[AttendanceStatus.L]: { on: "$info10", off: "$info2" },
};
