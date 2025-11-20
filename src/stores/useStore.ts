import { create } from 'zustand';
import type { StoreType } from '@/types';
import { createUserSlice } from './slices';

export const useStore = create<StoreType>()((...store) => ({
  UserSlice: createUserSlice(...store),
}));

export const useUser = () => useStore((state) => state.UserSlice.user);
export const useUserActions = () =>
  useStore((state) => state.UserSlice.userActions);
