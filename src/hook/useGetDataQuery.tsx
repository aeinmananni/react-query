/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetDataQuery = <T,>(v: { url: string; queryKey: any[] }) => {
  // let totalCount = 0;
  const { isPending, data } = useQuery<T>({
    queryKey: v.queryKey,
    queryFn: async ({ queryKey, signal }) => {
      console.log(queryKey);
      const result = await axios.get(v.url, { params: queryKey[1], signal });
      return result.data;
    },
    // ! کارکنیم queryFn میتوانیم به این صورت روی خروجی
    // select: (result: T) => {
    //   totalCount = result?.count;
    //   return result;
    // },
    //در زمانی که بخواهیم نمایش دیتا های خود را شرطی کنیم
    // enabled: v.queryKey[1].search !== null && v.queryKey[1].search.length > 2
    enabled: true,
  });

  return { isPending, data };
};
