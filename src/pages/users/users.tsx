import { Table } from '../../components';
import { UserType } from '../../models';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit2 } from 'react-icons/fi';
import { useGetDataQuery } from '../../hook/useGetDataQuery';
const column: Record<keyof Omit<UserType, 'userId'>, string> & { operation: string } = {
  operation: 'عملیات',
  firstName: 'نام',
  lastName: 'نام خانوادگی',
  email: 'ایمیل',
};

export default function UsersPage() {
  const { data, isPending } = useGetDataQuery({ url: '/api/users/Get/All', queryKey: ['Users'] });
  return (
    <div className="flex  flex-col  items-center ">
      {isPending ? (
        <h1>Loading...</h1>
      ) : (
        <Table columnTbl={column} rowTble={data}>
          {({ action }) => (
            <div className="flex items-center justify-center gap-2">
              <FaRegTrashCan
                onClick={() => console.log(action)}
                className="text-red-500"
                cursor={'pointer'}
              />
              <FiEdit2
                onClick={() => console.log(action)}
                className="text-blue-500"
                cursor={'pointer'}
              />
            </div>
          )}
        </Table>
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
