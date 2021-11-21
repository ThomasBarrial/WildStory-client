/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
// import { useUserFromStore } from '../store/user.slice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

import TextInput from '../components/formInputs/TextInput';
import { auth, formation, user } from '../API/request';
import DateInput from '../components/formInputs/DateInput';
import { formInputs } from '../components/formInputs/FormInputs';

import PasswordForm from '../components/formInputs/PasswordForm';
import SelectInput from '../components/formInputs/SelectInput';
import HeaderUser from '../components/formInputs/HeaderUser';
import { useUserFromStore } from '../store/user.slice';

interface IResMutation {
  message: string;
  user: IUser;
  id?: string;
}

interface IUserLog {
  username: string | undefined;
  password: string | undefined;
}
function CreateUpdateUser(): JSX.Element {
  const [password, setPassword] = useState<string | undefined>();

  const { dispatchLogin } = useUserFromStore();

  const router = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: formationData,
    isLoading: formationsLoad,
    error: formationsError,
  } = useQuery<IFormation[], AxiosError>(['formations'], () =>
    formation.getAll()
  );

  const { mutate, isLoading, isError } = useMutation<
    IResMutation,
    // eslint-disable-next-line camelcase
    AxiosError<{ message_en: string; message_fr: string }>,
    IUserLog
  >(auth.login, {
    onSuccess: (data) => {
      dispatchLogin(data);
      router.push(`/userassets/${data.id as string}`);
    },
  });

  const { mutateAsync: createData, error: postError } = useMutation(user.post, {
    onSuccess: (data) => {
      mutate({ username: data.username, password });
    },
  });

  const onSubmit: SubmitHandler<INewUser> = (data: INewUser) => {
    setPassword(data.password);
    const UserData = {
      profilTitle: data.profilTitle,
      username: data.username,
      email: data.email,
      password: data.password,
      city: data.city,
      birthDate: data.birthDate,
      avatarUrl: '',
      landimageUrl: '',
      idFormation: data.idFormation,
    };
    return createData({ UserData });
  };

  if (formationsLoad || isLoading) {
    return <p>...Loading</p>;
  }
  if (formationsError || postError || isError) {
    return <p>Error</p>;
  }
  return (
    <div className="w-sreen py-14 h-screen pb-14 bg-black fixed inset-0 z-50 overflow-y-scroll">
      <HeaderUser title="Create your profil" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        action="Create/Update Post"
        className="mx-4  lg:w-8/12 lg:mx-auto"
      >
        {formInputs.map((i) => {
          return (
            <div key={i.id}>
              <TextInput
                label={i.label}
                name={i.name}
                placeholder={i.placeholder}
                register={register}
                required={i.required}
                error=""
                id={i.id}
              />
            </div>
          );
        })}
        <DateInput id="BirthDate" register={register} name="birthDate" />
        <div className="mt-5">
          <SelectInput
            required
            formationData={formationData}
            name="idFormation"
            id="formation"
            register={register}
          />
        </div>
        <PasswordForm error={errors} register={register} />
        <button className="w-full p-2  mt-5 lg:mt-10 bg-pink" type="submit">
          Create my profil
        </button>
      </form>
    </div>
  );
}

export default CreateUpdateUser;
