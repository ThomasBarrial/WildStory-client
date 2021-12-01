/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  isError: boolean;
  required: boolean;
}

function Form({ register, isError, required }: IProps): JSX.Element {
  return (
    <div className="w-full">
      {' '}
      <label
        className="mt-5 lg:mt-5  w-full  text-sm flex flex-col"
        htmlFor="username"
      >
        Username
        <input
          className=" focus:outline-none border-white p-2 bg-black rounded-md border mt-2 "
          type="text"
          {...register('username', { required })}
        />
      </label>
      <label className="mt-5 w-full  text-sm flex flex-col" htmlFor="Password">
        Password{' '}
        <input
          className=" focus:outline-none border-white p-2 bg-black rounded-md border mt-2 "
          type="password"
          {...register('password', { required })}
        />
      </label>
      {isError && (
        <p className="text-red-500 w-full  text-left text-xs mt-2">
          wrong credentials try again
        </p>
      )}
    </div>
  );
}

export default Form;
