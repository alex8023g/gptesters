import {
  addAppAction,
  appInstalledByUser,
  getAppById,
  getAppsForTestind,
  getNotUserAppList,
  getUserAppList,
  getUserAppTesters,
  revalidatePathUser,
} from './appActions';

export const appAction = {
  addApp: addAppAction,
  appInstalledByUser,
  getAppsForTestind,
  getAppById,
  getUserAppList,
  revalidatePathUser,
  getNotUserAppList,
  getUserAppTesters,
} as const;
