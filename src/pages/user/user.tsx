import { useGetDataQuery } from '../../hook/useGetDataQuery';
import { useStoreReactQuery } from '../../store';

export default function User() {
  const userInfo = useStoreReactQuery(s => s.userInfo);
  const { data } = useGetDataQuery({
    url: '/api/users/GET/single',
    queryKey: ['Users', { userId: userInfo && userInfo.userId }],
    initailData: userInfo && userInfo.userId,
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <h1>کاربری انتخاب نشده</h1>}
    </div>
  );
}
/**
 *  PlaceholderData =>
 *                   داده هارو توی کوئری کش ذخیره نمیکنه
 *                   میدهد observer و صرفا داده رو به صورت مستقیم به ان
 *                   مناسب برای زمان هایی که میخواهیم داده های فیک
 *                   را به کاربر نمایش دهیم
 *
 *  initailData =>
 *                فرض بر این است این داده ها داده های درستی هستند
 *                وزمانی که ان را ست میکنیم مثل این است که فانکشن
 *                زیر یک بار اجرا شده باشد
 * 
*     queryFn: async ({ queryKey, signal }) => {
      const result = await axios.get(v.url, { params: queryKey[1], signal });
      return result.data;
    },
                  ان ستفاده هایی که ای استیل تایم داشتیم اجرا میشود 
                  و اگر داده کهنه شود مجدد سعی میکنم دیتا رو گرفته و بروز کنه
                  ----------------------------------------------
               میتوانیم  initailData  از دیگز مزیت های
               درون ان فانکشن داشته باشم
               ----------------------------------------------
  initialDataUpdatedAt => 
                           initailData میتوانیم تایمی را برای بروزرسانی 
                            درنظر بگیریم و بگوییم چه زمانی بروزرسانی 
                            تابتواندروی ان استیل تایم تاثیر بگذارد
                            
 */
