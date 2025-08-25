import { useForm } from 'react-hook-form';
import { Input, Button } from '../../custom';
import { UserType } from '../../models';
import { useAddUser } from '../../hook/useAddUser';
const inputClassName = 'border p-2 rounded-lg';
export default function Form() {
  const { register, handleSubmit, reset } = useForm<UserType>();
  const { mutate } = useAddUser();
  const onSubmit = (data: UserType) => {
    mutate(data);
    reset({
      firstName: '',
      lastName: '',
      email: '',
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-1/4 border p-5 rounded-lg"
    >
      <Input {...register('firstName')} className={inputClassName} placeholder="firstName" />
      <Input {...register('lastName')} className={inputClassName} placeholder="lastName" />
      <Input {...register('email')} className={inputClassName} placeholder="email" />
      <Button type="submit" className="bg-blue-500 rounded-md">
        Submit
      </Button>
    </form>
  );
}
