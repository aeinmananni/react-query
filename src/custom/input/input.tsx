import { InputHTMLAttributes } from 'react';

type InputProps = object & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: InputProps) {
  return <input {...props} />;
}
