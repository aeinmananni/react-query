import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStoreReactQuery } from '../store';
import { UserType } from '../models';

export const useInfinitQueryHook = () => {
  const { params } = useStoreReactQuery();

  const query = useInfiniteQuery<{
    users: Array<Record<keyof UserType, string>>;
    count: number;
  }>({
    queryKey: ['infinite-user', params.search],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get('/api/users/Get/All', {
        params: {
          search: params.search,
          offset: pageParam,
          limit: params.limit,
        },
      });
      return res.data as { users: Array<Record<keyof UserType, string>>; count: number };
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.count;
      const loadedSoFar = allPages.flatMap(p => p.users).length;
      if (loadedSoFar < totalCount) {
        return loadedSoFar;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  // 👇 اینجا داده‌ها رو فلت می‌کنیم تا به فرمت Users بخوره
  const flatData = query.data
    ? {
        users: query.data.pages.flatMap(p => p.users),
        count: query.data.pages[0]?.count ?? 0,
      }
    : undefined;

  return {
    data: flatData,
    isPending: query.isPending,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};
