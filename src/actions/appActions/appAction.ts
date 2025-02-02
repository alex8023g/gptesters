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
  getAllTesterEmails,
  addUsersAsTesters,
  isNotAddedTesters,
  addAsTester,
  markAppHasEnoughInstalls,
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
  getAllTesterEmails,
  addUsersAsTesters,
  isNotAddedTesters,
  addAsTester,
  markAppHasEnoughInstalls,
} as const;
