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
    <label htmlFor={id} className="flex flex-col mt-7 font-bold">
      {label}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        {...register(name, { required })}
        className="bg-black mt-2 border focus:outline-none p-2 border-pink"
      />
      <p className="text-red text-xs">{error}</p>
    </label>
  );
}

export default TextInput;
