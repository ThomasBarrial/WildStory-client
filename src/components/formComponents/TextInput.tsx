/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  required: boolean;
  error: string;
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
    <label htmlFor={id} className="flex w-full mt-5 flex-col font-bold">
      {label}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        {...register(name, { required })}
        className="bg-black mt-2 border rounded-md focus:outline-none p-2 border-white"
      />
      <p className="text-red text-xs">{error}</p>
      {required && <p className="text-xs text-pink mt-2">Fieds required</p>}
    </label>
  );
}

export default TextInput;
