/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetDataQuery = (v: { url: string; queryKey: any[] }) => {
  const { isPending, data } = useQuery({
    queryKey: v.queryKey,
    queryFn: async ({ queryKey }) => {
      const result = await axios.get(v.url, { params: queryKey[1] });
      return result.data;
    },
    enabled: true,
  });

  return { isPending, data };
};
