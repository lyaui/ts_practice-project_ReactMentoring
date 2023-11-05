import { forwardRef, type ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...others }, ref) => {
    return (
      <div className='control'>
        <label htmlFor={id}>{label}</label>
        <input id={id} type='text' ref={ref} {...others} />
      </div>
    );
  },
);

export default Input;
