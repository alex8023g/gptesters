import { addUser, login } from './userActions';

export const userAction = {
  login,
  addUser,
} as const;
