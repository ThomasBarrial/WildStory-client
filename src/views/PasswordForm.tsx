/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { user } from '../API/request';
import PassworrdInput from '../components/formComponents/PassworrdInput';
import { useUserFromStore } from '../store/user.slice';

interface IMdp {
  id: string;
  isPassword: boolean;
  setIsPassword: Dispatch<SetStateAction<boolean>>;
}

interface IFromData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

function PasswordForm({ id, setIsPassword, isPassword }: IMdp): JSX.Element {
  const [formError, setFormError] = useState('');
  const { dispatchUser } = useUserFromStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // WE UPDATE THE USER'S PASSWORD
  const { mutateAsync: passwordMutate } = useMutation(
    'user',
    user.updatePassword,
    {
      onSuccess: (data) => {
        dispatchUser(data);
        setIsPassword(false);
        toast('Password update');
      },
      onError: () => {
        setFormError("L'ancien mot de passe est incorrect.");
      },
    }
  );

  const onSubmit: SubmitHandler<IFromData> = (data: IFromData) => {
    const updatePassword = {
      oldPassword: data.oldPassword,
      password: data.password,
    };
    // CHECK IF THE NEW PASSWORD IS DIFFERENT THAN THE OLDER
    if (data.oldPassword === data.password) {
      setFormError('The new password is the same as the older one');
      // SAME FOR THE CONFIRM PASSWORD
    } else if (data.password !== data.confirmPassword) {
      setFormError(`The confirm password don't match to new one`);
    } else {
      passwordMutate({
        updatePassword,
      });
    }
  };

  return (
    <>
      {!id || isPassword ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="transform  flex flex-col justify-start mt-5 font-lexend font-bold"
        >
          {id !== undefined && (
            <PassworrdInput
              label="OldPassword"
              register={register}
              isRequired
              error={errors}
              name="oldPassword"
            />
          )}
          <PassworrdInput
            label="Password"
            register={register}
            isRequired
            error={errors}
            name="password"
          />

          <PassworrdInput
            label="Confirm password"
            register={register}
            isRequired
            error={errors}
            name="confirmPassword"
          />
          <p className="mt-5 text-pink">{formError}</p>
          <button
            className="w-full p-2 rounded-sm mt-2  text-pink border border-pink"
            type="submit"
          >
            {' '}
            Update password
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsPassword(true)}
          className="text-pink underline rounded-md mt-5"
          type="button"
        >
          EditPassword
        </button>
      )}
    </>
  );
}

export default PasswordForm;
