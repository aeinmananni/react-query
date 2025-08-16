import { Users } from '../../components';
import { Button } from '../../custom';
import { useInfinitQueryHook } from '../../hook/useInfiniteQuery';

const InfiniteUser = () => {
  const { data, isPending, fetchNextPage, hasNextPage } = useInfinitQueryHook();

  return (
    <div>
      <Users data={data} isPending={isPending} />

      {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
    </div>
  );
};

export default InfiniteUser;
