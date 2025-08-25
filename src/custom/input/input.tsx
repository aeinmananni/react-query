import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = object & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;
