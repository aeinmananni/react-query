import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetDataQuery = (v: { url: string; queryKey: string[] }) => {
  const { isPending, data } = useQuery({
    queryKey: v.queryKey,
    queryFn: async () => {
      const result = await axios.get(v.url);
      return result.data;
    },
  });

  return { isPending, data };
};
