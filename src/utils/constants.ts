import { AttendanceStatus } from '@app/types';

// Indexed DB
export const DB_NAME = 'RIGEL_LOCAL';
export const DB_VERSION = 19;

// App constants
export const APP_VERSION = 'v0.9.2';
export const SET_DATA_MSG = 'SET_DATA_MSG';
export const SYNC_DATA_MSG = 'SYNC_DATA_MSG';
export const DOWNLOAD_AND_SYNC_MSG = 'DOWNLOAD_AND_SYNC_MSG';
export const EXIT_MESSAGE = 'EXIT_MESSAGE';
export const JWT_KEY = 'jwt';
export const DEFAULT_CLASS_KEY = 'default_class';
export const LAST_ERR_SYNC_KEY = 'LAST_ERR_SYNC_KEY';
export const API_URL = import.meta.env.VITE_API_URL;
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// other
export const attendanceColors: {[key in AttendanceStatus]: { on: string, off: string }} = {
  [AttendanceStatus.P]: { on: '$success10', off: '$success5' },
  [AttendanceStatus.F]: { on: '$danger10', off: '$danger5' },
  [AttendanceStatus.A]: { on: '$warning10', off: '$warning5' },
  [AttendanceStatus.L]: { on: '$info10', off: '$info5' },
};
