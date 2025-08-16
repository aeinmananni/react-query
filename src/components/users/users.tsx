import { Table } from '..';
import { UserType } from '../../models';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit2 } from 'react-icons/fi';
import { useStoreReactQuery } from '../../store';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const column: Record<keyof UserType, string> & { operation: string } = {
  operation: 'عملیات',
  firstName: 'نام',
  lastName: 'نام خانوادگی',
  email: 'ایمیل',
  userId: 'ردیف',
};

type UserPageProps = {
  data:
    | {
        users: Record<keyof UserType, string>[] | undefined;
        count: number;
      }
    | undefined;
  isPending: boolean;
};

export default function UsersPage({ data, isPending }: UserPageProps) {
  const setParams = useStoreReactQuery(s => s.setParams);
  const params = useStoreReactQuery(s => s.params);
  const setUserId = useStoreReactQuery(s => s.setUserId);
  const nav = useNavigate();
  useEffect(() => {
    if (data && data.count !== params.count) {
      setParams(prev => ({ ...prev, count: data.count }));
    }
  }, [data, params.count, setParams]);

  return (
    <div className="flex  flex-col  items-center h-full justify-center">
      {isPending ? (
        <div className="loading loading-bars loading-lg text-secondary" />
      ) : (
        <div className="flex flex-col gap-2 w-full h-full ">
          {data && Number(data?.users?.length || 0) > 0 ? (
            <Table columnTbl={column} rowTble={data?.users || []}>
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
          ) : (
            <h1 className="p-3 bg-orange-500 text-white w-full flex items-center justify-center text-lg font-bold">
              اطلاعاتی موجود نیست
            </h1>
          )}
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
