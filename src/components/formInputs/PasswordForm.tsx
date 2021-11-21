/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface IMdp {
  error: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
}

function PasswordForm({ error, register }: IMdp): JSX.Element {
  return (
    <div className="transform  flex flex-col justify-start mt-5 font-lexend font-bold">
      <label htmlFor="mdp" className="flex flex-col">
        Password
        <input
          className="bg-black border rounded-none p-2 mt-2 focus:outline-none"
          type="password"
          {...register('password', {
            minLength: 4,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
            required: true,
          })}
        />
        <p className="text-xs text-pink mt-2">Fieds required</p>
        <p className="text-pink">
          {error?.password?.type === 'pattern'
            ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
            : error?.password?.message}
        </p>
      </label>
      <label htmlFor="confirmmdp" className="w-full mt-5">
        Confirm password
        <input
          className="bg-black w-full border rounded-none p-2 mt-2 focus:outline-none"
          type="password"
          {...register('confirmPassword', {
            minLength: 4,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
            required: true,
          })}
        />
        <p className="text-xs text-pink mt-2">Fieds required</p>
        <p className="text-pink">
          {error?.confirmPassword?.type === 'pattern'
            ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
            : error?.confirmPassword?.type}
        </p>
      </label>
    </div>
  );
}

export default PasswordForm;
