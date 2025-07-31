import { create } from 'zustand';
import { ParamsType } from '../models';
type StoreType = {
  userId: number | null;
  params: ParamsType;
  setParams: (v: ParamsType | ((c: ParamsType) => ParamsType)) => void;
  setUserId: (v: number) => void;
};

export const useStoreReactQuery = create<StoreType>()(_set => ({
  userId: null,
  params: {
    search: '',
    offset: 0,
    limit: 5,
    count: 0,
  },
  setParams: (v: ParamsType | ((c: ParamsType) => ParamsType)) => {
    _set(state => ({
      params: typeof v === 'function' ? v(state.params) : v,
    }));
  },
  setUserId: (v: number) => {
    _set({ userId: v });
  },
}));
