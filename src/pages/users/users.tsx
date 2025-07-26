import { Table } from '../../components';
import { UserType } from '../../models';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit2 } from 'react-icons/fi';
import { useGetDataQuery } from '../../hook/useGetDataQuery';
import { useStoreReactQuery } from '../../store';
import { useNavigate } from 'react-router';
import { Input } from '../../custom';
import { useState } from 'react';
const column: Record<keyof UserType, string> & { operation: string } = {
  operation: 'عملیات',
  firstName: 'نام',
  lastName: 'نام خانوادگی',
  email: 'ایمیل',
  userId: 'ردیف',
};

export default function UsersPage() {
  const [search, setSearch] = useState<string>('');
  const { data, isPending } = useGetDataQuery({
    url: '/api/users/Get/All',
    queryKey: ['Users', { search }],
  });
  const setUserId = useStoreReactQuery(s => s.setUserId);

  const nav = useNavigate();
  return (
    <div className="flex  flex-col  items-center ">
      {isPending ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col gap-2">
          <Input
            placeholder="search..."
            className="border p-2 rounded-lg"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Table columnTbl={column} rowTble={data}>
            {({ action }) => (
              <div className="flex items-center justify-center gap-2">
                <FaRegTrashCan
                  onClick={() => console.log(action.userId)}
                  className="text-red-500"
                  cursor={'pointer'}
                />
                <FiEdit2
                  onClick={() => {
                    setUserId(+action.userId);
                    nav('/user');
                  }}
                  className="text-blue-500"
                  cursor={'pointer'}
                />
              </div>
            )}
          </Table>
        </div>
      )}
    </div>
  );
}

/**
 *  قرار دارد fetching دیتا درحالت   fetchStatus در اولین مرحله از نمایش
 *   میرود idle بعد از مدتی به حالت
 *   میرود یعنی دیتا کهنه است و باید مجدد ریفرش اتفاق بی افتدstale  سپس به حالت
 *  اگر بخواهیم جلوی این رفچ را بگیریم میتوانیم از این روش استفاده کنیم
 *
 *
 */
