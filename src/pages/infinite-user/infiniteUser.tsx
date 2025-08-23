/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { Users } from '../../components';
import { Input } from '../../custom';
import { useInfinitQueryHook } from '../../hook/useInfiniteQuery';
import { useStoreReactQuery } from '../../store';

const InfiniteUser = () => {
  const { data, isPending, fetchNextPage, hasNextPage } = useInfinitQueryHook();
  const params = useStoreReactQuery(s => s.params);
  const setParams = useStoreReactQuery(s => s.setParams);
  const loadingTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (hasNextPage && entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadingTarget.current) {
      observer.observe(loadingTarget.current);
    }

    return () => {
      if (loadingTarget.current) {
        observer.unobserve(loadingTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, data?.users?.length]);
  return (
    <div className="flex flex-col gap-2 w-1/2 h-full p-3 overflow-y-auto">
      <Input
        placeholder="search..."
        className="border p-2 rounded-lg w-full mx-auto"
        value={params.search}
        onChange={e => setParams(prev => ({ ...prev, search: e.target.value, offset: 0 }))}
      />
      <Users data={data} isPending={isPending} />

      {hasNextPage && <div ref={loadingTarget} className="py-4 text-center text-gray-500 "></div>}
    </div>
  );
};

export default InfiniteUser;
