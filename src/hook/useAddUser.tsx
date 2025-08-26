/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserType } from '../models';

export const useAddUser = (userId?: number) => {
  const client = useQueryClient();

  const { mutate, mutateAsync } = useMutation({
    mutationKey: [userId ? 'edit-users' : 'add-users'], // میتوانیم برای میوتیشن نیز نام ست کنیم
    mutationFn: (data: UserType) => {
      return axios[userId ? 'put' : 'post'](
        userId ? '/api/users/PUT/Edit' : '/api/users/POST/Add',
        data
      );
    },
    // فانکشنی است که قبل از اجرا میوتیشن اجرا میشود
    // از ان استفاده کنیمOptimistic Update  میتوانیم برای سیاست
    onMutate: variables => {
      const oldState = client.getQueryData(['edit-users']);

      return oldState;
    },
    //---------------------------------------
    // رو مدیریت کنیم onMutate متدی است که اگر ارروری داشتیم میتوانیم فعالیت های درون
    // و یا میتوانیم تغییرات را ریورت کنیم
    /**
     *  سه پارمتر دارد که میتوانیم با ان ها کار کنیم
     * 1- اررور هارانمایش میدهد
     * @param error
     *  2-دیتایی که در یالا داریم
     * @param variable
     *
     * 3- به ما میدهد onMutate تابع  return مقداری است که از
     * @param context
     */
    onError: (error, variable, context) => {},
    //---------------------------------------------------------
    //   تحت شرشرایطی چه اررور داشته باشم چه نداشته باشم
    //  میتوانیم دستورات را اینجا اجرا کنیم
    onSettled: () => {},

    //--------------------------------------
    onSuccess: () => {
      //میتوانیم با این روش دیتا های خود را مجدد بروز رسانی کنیم در جدول
      client.invalidateQueries({ queryKey: ['Users'] });
    },
  });

  return { mutate, mutateAsync };
};

//mutate => فانکشنی است میتوانیم جا های مختلفی از ان استفاده کنیم
// که کاری را که در این قستم انجام دادیم برای ما انجام دهد
/**
   *   mutationFn: data => {
      return axios.post('/api/users/POST/Add', data);
    },
    به هرنحوی اگر درخواستی که داریم میفرستیم نیاز مند صبر کردن باشد یا بخواهیم از 
    استفاده کنیم mutateAsync ان استفاده کنیم میتوانیم از then  متد 

    -----------------------------------------------------------
    درواقع ما دونوع کش داریم اولین کش همان کشی است که رای فراخوانی و بازخوانی
    دیتا از ان استفاده میکنیم
     است کا حافظه کش های میوتیت شده دران  mutation Catch  دومین کش بنام 
     وجود دارد
     ------------------------------------------------------------------
     ما میتوانیم قبل یا بعد از اجرا میوتیشن کار هایی را انجام دهیم

   */
