import { Outlet } from 'react-router';
import { Navbar } from '../../components';

/**
 *
 * اگر ما 5 تا کامپوننت هم از این نوع بسازیم یک بار درخواست به سرور برای دریافت دیتا زده میشود
 * دراین حالتی که برسی شده درصورتی که فلگ وجود داشته باشد دیتا برای ما اکتیو و در صورت نبودن فلگ این اکتیو خواهد شد
 */

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <Navbar />
      <div className="w-full h-full border-4 border-yellow-500 flex flex-col  overflow-y-auto py-6 items-center">
        <Outlet />
      </div>
    </div>
  );
}
