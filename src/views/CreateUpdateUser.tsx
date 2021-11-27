/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
// import { useUserFromStore } from '../store/user.slice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

import TextInput from '../components/formInputs/TextInput';
import { auth, formation, user } from '../API/request';
import DateInput from '../components/formInputs/DateInput';
import { formInputs } from '../components/formInputs/FormInputs';

import PasswordForm from './PasswordForm';
import SelectInput from '../components/formInputs/SelectInput';
import HeaderUser from '../components/formInputs/HeaderUser';
import { useUserFromStore } from '../store/user.slice';
import useModal from '../hook/useModal';
import Modal from '../components/modal/Modal';

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
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState<string | undefined>();
  const { setIsModal, setMessage, isModal, message } = useModal();
  const { dispatchLogin } = useUserFromStore();
  const router = useHistory();
  const { dispatchUser, user: userFromStore } = useUserFromStore();
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const {
    data: formationData,
    isLoading: formationsLoad,
    error: formationsError,
  } = useQuery<IFormation[], AxiosError>(['formations'], () =>
    formation.getAll()
  );

  const { isLoading: usertoUpdateLoad, error: usertoUpdateError } = useQuery<
    IUser,
    AxiosError
  >(['getUserDataToUpdate', id], () => user.getOne(id), {
    enabled: Boolean(id),
    onSuccess: (data) => {
      setValue('profilTitle', data.profilTitle);
      setValue('username', data.username);
      setValue('email', data.email);
      setValue('city', data.city);
      setValue('birthDate', data.birthDate);
      setValue('avatarUrl', data.avatarUrl);
      setValue('landimageUrl', data.landimageUrl);
      setValue('idFormation', data.idFormation);
    },
  });

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

  const { mutateAsync: createData, error } = useMutation(user.post, {
    onSuccess: (data) => {
      mutate({ username: data.username, password });
      setMessage('Something goes wrong :( Please try later');
      setIsModal(true);
    },
  });

  const { mutateAsync: updateData } = useMutation<
    INewUser,
    AxiosError,
    { UserData: INewUser; id: string }
  >(user.put, {
    onSuccess: (data) => {
      dispatchLogin(data);
      setMessage('Your profil as been edit successfully');
      setIsModal(true);
    },
    onError: () => {
      setMessage('Oups email or username already use');
      setIsModal(true);
    },
  });

  const { mutateAsync: passwordMutate } = useMutation(
    'user',
    user.updatePasword,
    {
      onSuccess: (data) => {
        setMessage('Les données ont bien été modifiées');
        setIsModal(true);
        dispatchUser(data);
      },
      onError: () =>
        setError('user.oldPassword', {
          message: "L'ancien mot de passe est incorrect.",
        }),
    }
  );

  const onSubmit: SubmitHandler<INewUser> = (data: INewUser) => {
    setPassword(data.password);
    const UserData = {
      profilTitle: data.profilTitle,
      username: data.username,
      email: data.email,
      password: data.password,
      city: data.city,
      birthDate: data.birthDate,
      avatarUrl: userFromStore.avatarUrl,
      landimageUrl: userFromStore.landimageUrl,
      idFormation: data.idFormation,
    };

    const passwordsToCompare = {
      oldPassword: data.oldPassword,
      password: data.password,
    };

    if (passwordsToCompare.oldPassword === passwordsToCompare.password) {
      setError('password', {
        message: 'The new password is the same as the older',
      });
    } else if (passwordsToCompare.password !== data.confirmPassword) {
      setError('confirmPassword', {
        message: 'You can not use the same password',
      });
    } else {
      passwordMutate({
        passwordsToCompare,
      });
    }

    if (!id) return createData({ UserData });
    return updateData({ id, UserData });
  };

  if (formationsLoad || isLoading || usertoUpdateLoad) {
    return <p>...Loading</p>;
  }
  if (formationsError || isError || usertoUpdateError) {
    return <p>Error</p>;
  }

  return (
    <div
      className={`w-sreen py-8  pb-14 bg-black ${
        !id && `fixed h-screen inset-0 z-50 overflow-y-scroll`
      } `}
    >
      {isModal && (
        <Modal
          title="Every things geos well"
          buttons={
            !error
              ? [
                  {
                    text: 'ok',
                    handleClick: () => {
                      if (message === 'Oups email or username already use') {
                        setIsModal(false);
                      } else {
                        router.push(`/profil/${id}`);
                      }
                    },
                  },
                ]
              : [{ text: 'New try', handleClick: () => setIsModal(false) }]
          }
        >
          {message}
        </Modal>
      )}
      <HeaderUser
        userUpdateid={id}
        title={!id ? `Create your profil` : `Edit your profil`}
      />

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
        {!id || isPassword ? (
          <PasswordForm id={id} error={errors} register={register} />
        ) : (
          <button
            onClick={() => setIsPassword(true)}
            className="text-pink underline mt-5"
            type="button"
          >
            EditPassword
          </button>
        )}

        <button
          className="w-full p-2 rounded-md mt-5 lg:mt-5 bg-pink"
          type="submit"
        >
          {!id ? 'Create my profil' : 'Edit profil'}
        </button>
        {error && <p className="text-red-500">Username or email already use</p>}
      </form>
    </div>
  );
}

export default CreateUpdateUser;
