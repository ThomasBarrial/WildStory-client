/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  required: boolean;
  error: string | null;
  id: string;
}

function TextInput({
  label,
  placeholder,
  register,
  name,
  required = false,
  error,
  id,
}: IProps): JSX.Element {
  return (
    <label htmlFor={id} className="flex flex-col mt-7  font-bold">
      {label}
      <textarea
        id={id}
        placeholder={placeholder}
        {...register(name, { required })}
        className="bg-black rounded-md mt-2 border h-40 lg:h-52 focus:outline-none p-2 border-white"
      />
      {required && <p className="text-xs text-pink mt-2">Fieds required</p>}
      <p className="text-red text-xs">{error}</p>
    </label>
  );
}

export default TextInput;
