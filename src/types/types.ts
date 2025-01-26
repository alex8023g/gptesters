export type UserWithApps = {
  name: string | null;
  id: string;
  email: string;
  userApps: {
    name: string;
    id: string;
    url: string;
    userId: string;
  }[];
};

export type AppsForUserTesting = {
  appId: string;
  name: string;
  url: string;
  isInstaled: boolean;
};
