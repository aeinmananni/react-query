import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { Button, Input } from '../../custom';
import { useStoreReactQuery } from '../../store';
import { Users } from '../../components';
import { useGetDataQuery } from '../../hook/useGetDataQuery';
import { UserType } from '../../models';
// import { useQueryClient } from '@tanstack/react-query';

const buttonClassName =
  'border w-1/12 py-2 rounded-lg shadow-md flex justify-center items-center active:scale-90 duration-300';

export default function UsersList() {
  const params = useStoreReactQuery(s => s.params);
  const setParams = useStoreReactQuery(s => s.setParams);
  const canGoNext = Number(params.offset) + Number(params.limit) >= Number(params.count);
  const canGoPrev = (params?.offset || 0) > 0;

  // const queryClient = useQueryClient();

  const { data, isPending } = useGetDataQuery<{
    users: Array<Record<keyof UserType, string>>;
    count: number;
  }>({
    url: '/api/users/Get/All',
    queryKey: ['Users', { ...params }],
  });
  return (
    <div className="flex flex-col gap-2 w-1/2 h-full">
      <Input
        placeholder="search..."
        className="border p-2 rounded-lg w-full mx-auto"
        value={params.search}
        onChange={e => setParams(prev => ({ ...prev, search: e.target.value, offset: 0 }))}
      />
      <div className=" h-1/2 ">
        <Users data={data} isPending={isPending} />
      </div>
      <div className="flex w-full justify-between items-center">
        <Button
          className={buttonClassName}
          disabled={!canGoPrev}
          onClick={() => {
            setParams(prev => ({ ...prev, offset: (prev.offset || 0) - (prev.limit || 5) }));
          }}
        >
          <MdSkipPrevious size={30} />
        </Button>

        {/* 
          میتوانیم جایی از این روش استفاده کنیم که درخواست زدیم پاسخی برنگشته 
          و میخواهیم فتچ را متوفق کنیم
        <Button
          onClick={() => queryClient.cancelQueries({ queryKey: ['Users', { ...params }] })}
          className="bg-red-500 text-white p-2 rounded-lg"
        >
          Calcle
        </Button> */}
        <Button
          disabled={canGoNext}
          className={buttonClassName}
          onClick={() =>
            setParams(prev => ({ ...prev, offset: (prev.offset || 0) + (prev.limit || 5) }))
          }
        >
          <MdSkipNext size={30} />
        </Button>
      </div>
    </div>
  );
}
