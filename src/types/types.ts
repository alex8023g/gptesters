export type UserApps = {
  name: string | null;
  id: string;
  email: string;
  apps: {
    name: string;
    id: string;
    url: string;
    userId: string;
  }[];
};
