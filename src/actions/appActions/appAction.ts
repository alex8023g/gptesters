import {
  addAppAction,
  appInstalledByUser,
  getAppById,
  getAppsForTestind,
  getTestersByAppId,
  getUserAppList,
} from './appActions';

export const appAction = {
  addApp: addAppAction,
  appInstalledByUser,
  getAppsForTestind,
  getAppById,
  getUserAppList,
  getTestersByAppId,
} as const;
