import type { IUserData } from './user.type';

export interface IUserState {
  userInfo: IUserData | null;
}

export interface IUserActions {
  setUser: (user: IUserData) => void;
  clearUser: () => void;
}

export interface IUserSlice {
  user: IUserState;
  userActions: IUserActions;
}

export type StoreType = {
  UserSlice: IUserSlice;
};
