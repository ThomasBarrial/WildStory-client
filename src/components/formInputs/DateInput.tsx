/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  name: string;
}

function DateInput({ id, register, name }: IProps): JSX.Element {
  return (
    <div>
      {' '}
      <label htmlFor={id} className="flex w-full mt-5 flex-col font-bold">
        BirthDate
        <p className="mt-2 h-10 p-1 border border-white ">
          <input className="bg-black" type="Date" id="bd" {...register(name)} />
        </p>
      </label>
    </div>
  );
}

export default DateInput;
