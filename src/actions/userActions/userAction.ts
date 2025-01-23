import { addUser, getUserById, login } from './userActions';

export const userAction = {
  login,
  addUser,
  getUserById,
} as const;
