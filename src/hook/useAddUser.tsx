import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserType } from '../models';

export const useAddUser = () => {
  const client = useQueryClient();
  //mutate => فانکشنی است میتوانیم جا های مختلفی از ان استفاده کنیم
  // که کاری را که در این قستم انجام دادیم برای ما انجام دهد
  /**
   *   mutationFn: data => {
      return axios.post('/api/users/POST/Add', data);
    },
    به هرنحوی اگر درخواستی که داریم میفرستیم نیاز مند صبر کردن باشد یا بخواهیم از 
    استفاده کنیم mutateAsync ان استفاده کنیم میتوانیم از then  متد 
   */
  const { mutate, mutateAsync } = useMutation({
    mutationFn: (data: UserType) => {
      return axios.post('/api/users/POST/Add', data);
    },
    onSuccess: () => {
      //میتوانیم با این روش دیتا های خود را مجدد بروز رسانی کنیم در جدول
      client.invalidateQueries({ queryKey: ['Users'] });
    },
  });

  return { mutate, mutateAsync };
};
