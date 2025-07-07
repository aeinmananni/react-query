import { useState } from "react";
import { Users } from "../pages";
/**
 *
 * اگر ما 5 تا کامپوننت هم از این نوع بسازیم یک بار درخواست به سرور برای دریافت دیتا زده میشود
 * دراین حالتی که برسی شده درصورتی که فلگ وجود داشته باشد دیتا برای ما اکتیو و در صورت نبودن فلگ این اکتیو خواهد شد
 */
export default function Home() {
  const [flag, setFlag] = useState<boolean>(false);
  return (
    <div className="w-full h-full border-4 border-yellow-500 flex flex-col">
      <span onClick={() => setFlag((S) => !S)}>DDD</span>
      {flag && <Users />}
    </div>
  );
}
