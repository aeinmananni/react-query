import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
//ابتدا برای این که بخواهیم به کوئری کش متصل شویم باید کوئری کلاینت را ایجاد کنیم
//درجایی که بخواهیم کوئری کلاینتی رو این اکتیو کنیم میتوانیم کلاینت را به صورت دستی تغییر دهیم
//مدیریت رفرنس کلاینت
const client: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 50000, // میخواهیم بگوییم بعد از هر 5ثانیه دیتارو اپدیت کن
      staleTime: 5000, // میخواهیم بگوییم تا 5 ثانیه دیتا بروز باشد
      gcTime: 10000, //بودند به طور کلی از کش حذف شود inAcutve دراینجا میگوییم اگر به مدت 10 ثانیه ایتم ها
      // refetchOnWindowFocus: false, //   بماند  idle  اگر ویندو ما مجدد فوکوس بگیرد و مجدد تب فعال بگیرد باعث میشود دیتا رفتچ نکد و روی مود
      // refetchOnMount: true, //  میتوانیم تایین کنیم در حالتی که دیتا مونت میشود خودش را اپدیت کند یا خیر در واقع درحالت فالس دیتایی فراخوانی نمیشود
      // refetchOnReconnect: true, // دیتای قبلی را  دارم و درواقع نتورک کانکت قطع
      //----------------------------------------------------------------------
      retry: 4, // برسی وضعیتی که کوئری فانکشن به مشکل بخورد حالا میتواند ایراد سرور باشد میتوانیم تعدادی را مشخص کنیم
      //  بدون اینکه به یو ای بگوید مشکلی پیش امده سعی کند ارتباط را توی تعداد مشخص شده برقرار کند و درصورت عدم موفقیت پیغام نمایش داده شود
      //-----------------------------------------------------------------------------------------
      // retryDelay: // کردن retry  میتوانیم مشخص کنیم چقدر فاصله باشد بین هر
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <main className="flex flex-col overflow-hidden w-full h-screen border-4 border-purple-500">
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </main>
    </QueryClientProvider>
  </StrictMode>
);
