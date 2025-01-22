import { addUser, login } from './userActionsFunctions';

export const userAction = {
  login,
  addUser,
} as const;
