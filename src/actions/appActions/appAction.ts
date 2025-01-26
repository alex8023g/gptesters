import {
  addAppAction,
  appInstalledByUser,
  checkAndRevalidateUserPage,
  getAppById,
  getAppsForTestind,
  getNotUserAppList,
  getUserAppList,
  getUserAppTesters,
  revalidatePathUser,
  getUserAppTestersEmails,
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
  checkAndRevalidateUserPage,
  getUserAppTestersEmails,
} as const;
