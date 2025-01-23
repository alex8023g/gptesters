import {
  addAppAction,
  appInstalledByUser,
  getAppById,
  getAppsForTestind,
  getUserAppList,
} from './appActions';

export const appAction = {
  addApp: addAppAction,
  appInstalledByUser,
  getAppsForTestind,
  getAppById,
  getUserAppList,
} as const;
