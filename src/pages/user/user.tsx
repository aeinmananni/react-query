import { useGetDataQuery } from '../../hook/useGetDataQuery';
import { useStoreReactQuery } from '../../store';

export default function User() {
  const userId = useStoreReactQuery(s => s.userId);
  const { data } = useGetDataQuery({
    url: '/api/users/GET/single',
    queryKey: ['Users', { userId }],
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <h1>کاربری انتخاب نشده</h1>}
    </div>
  );
}
