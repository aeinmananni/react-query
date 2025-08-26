import { create } from 'zustand';
import { ParamsType, UserType } from '../models';
type StoreType = {
  params: ParamsType;
  setParams: (v: ParamsType | ((c: ParamsType) => ParamsType)) => void;
  userInfo: UserType | null;
  setUserInfo: (v: UserType | ((c: UserType) => UserType) | null) => void;
};

export const useStoreReactQuery = create<StoreType>()(_set => ({
  params: {
    search: '',
    offset: 0,
    limit: 5,
    count: 0,
  },
  userInfo: null,
  setParams: (v: ParamsType | ((c: ParamsType) => ParamsType)) => {
    _set(state => ({
      params: typeof v === 'function' ? v(state.params) : v,
    }));
  },
  setUserInfo: (v: UserType | null | ((c: UserType) => UserType)) => {
    _set(state => ({
      userInfo: typeof v === 'function' ? v(Object(state?.userInfo || null)) : v,
    }));
  },
}));
