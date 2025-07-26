import { create } from 'zustand';

type StoreType = {
  userId: number | null;
  setUserId: (v: number) => void;
};

export const useStoreReactQuery = create<StoreType>()(_set => ({
  userId: null,
  setUserId: (v: number) => {
    _set({ userId: v });
  },
}));
