import {
  addAppAction,
  appInstalledByUser,
  getAppsForTestind,
} from './appActions';

export const appAction = {
  addApp: addAppAction,
  appInstalledByUser,
  getAppsForTestind,
} as const;
