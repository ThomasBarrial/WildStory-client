/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import PassworrdInput from '../components/formInputs/PassworrdInput';

interface IMdp {
  error: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  id: string;
}

function PasswordForm({ error, register, id }: IMdp): JSX.Element {
  const [isRequired, setIsRequired] = useState(true);

  useEffect(() => {
    if (id) {
      setIsRequired(false);
    }
  }, []);

  return (
    <div className="transform  flex flex-col justify-start mt-5 font-lexend font-bold">
      {id !== undefined && (
        <PassworrdInput
          label="OldPassword"
          register={register}
          isRequired={isRequired}
          error={error}
          name="oldPassword"
        />
      )}
      <PassworrdInput
        label="Password"
        register={register}
        isRequired={isRequired}
        error={error}
        name="password"
      />
      <PassworrdInput
        label="Confirm password"
        register={register}
        isRequired={isRequired}
        error={error}
        name="confirmPassword"
      />
    </div>
  );
}

export default PasswordForm;
