import {
  addUser,
  getUserById,
  getUserByIdWithApp,
  login,
  getAllUserList,
} from './userActions';

export const userAction = {
  login,
  addUser,
  getUserById,
  getUserByIdWithApp,
  getAllUserList,
} as const;
