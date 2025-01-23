import { addUser, getUserById, getUserByIdWithApp, login } from './userActions';

export const userAction = {
  login,
  addUser,
  getUserById,
  getUserByIdWithApp,
} as const;
