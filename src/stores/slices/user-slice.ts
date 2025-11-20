import type { StateCreator } from 'zustand';
import type { IUserData, IUserSlice, IUserState, StoreType } from '@/types';

const initialState: IUserState = {
  userInfo: null,
};

export const createUserSlice: StateCreator<StoreType, [], [], IUserSlice> = (
  set,
) => ({
  user: initialState,
  userActions: {
    setUser: (user: IUserData) =>
      set((state) => ({
        UserSlice: {
          ...state.UserSlice,
          user: {
            ...state.UserSlice.user,
            userInfo: user,
          },
        },
      })),
    clearUser: () =>
      set((state) => ({
        UserSlice: {
          ...state.UserSlice,
          user: {
            ...state.UserSlice.user,
            userInfo: null,
          },
        },
      })),
  },
});
