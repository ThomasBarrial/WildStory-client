import React from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface IProps {
  label: string;
  error: DeepMap<FieldValues, FieldError>;
  isRequired: boolean;
  register: UseFormRegister<FieldValues>;
  name: string;
}

function PassworrdInput({
  label,
  error,
  isRequired,
  register,
  name,
}: IProps): JSX.Element {
  return (
    <div>
      <label htmlFor="confirmmdp" className="w-full mt-5">
        {label}
        <input
          className="bg-black w-full border rounded-md p-2 my-4 focus:outline-none"
          type="password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(name, {
            minLength: 4,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
            required: isRequired,
          })}
        />{' '}
        {isRequired && <p className="text-xs text-pink mt-2">Fied required</p>}
        <p className="text-pink text-xs">
          {error?.confirmPassword?.type === 'pattern'
            ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
            : error?.confirmPassword?.type}
        </p>
      </label>
    </div>
  );
}

export default PassworrdInput;
