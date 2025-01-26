import {
  addAppAction,
  appInstalledByUser,
  checkAndRevalidateUserPage,
  getAppById,
  getAppsForTesting,
  getNotUserAppList,
  getUserAppList,
  getUserAppTesters,
  revalidatePathUser,
  getUserAppTestersEmails,
} from './appActions';

export const appAction = {
  addApp: addAppAction,
  appInstalledByUser,
  getAppsForTesting,
  getAppById,
  getUserAppList,
  revalidatePathUser,
  getNotUserAppList,
  getUserAppTesters,
  checkAndRevalidateUserPage,
  getUserAppTestersEmails,
} as const;
