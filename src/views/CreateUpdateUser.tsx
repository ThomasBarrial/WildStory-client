/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import TextInput from '../components/formComponents/TextInput';
import { auth, formation, user } from '../API/request';
import DateInput from '../components/formComponents/DateInput';
import { formInputs } from '../components/formComponents/FormInputs';
import PasswordForm from './PasswordForm';
import SelectInput from '../components/formComponents/SelectInput';
import HeaderUser from '../components/formComponents/HeaderUser';
import { useUserFromStore } from '../store/user.slice';
import useModal from '../hook/useModal';
import Modal from '../components/modal/Modal';
import Loader from '../components/loader/Loader';

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

  // FETCH ALL THE FORMATIONS FOR THE SELECT INPUT
  const {
    data: formationData,
    isLoading: formationsLoad,
    error: formationsError,
  } = useQuery<IFormation[], AxiosError>(['formations'], () =>
    formation.getAll()
  );

  // IF THE ID FROM THE URL IS DEFINED WE FETCH THE USER'S DATA AND SET THE DEFAULT VALUES OF THE FORM
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

  // IF THE USER WAS SUCCESSFULLY CREATED WE LOG HIM AND OPEN HIS PROFIL PAGE
  const { mutate, isLoading, isError } = useMutation<
    IResMutation,
    // eslint-disable-next-line camelcase
    AxiosError<{ message_en: string; message_fr: string }>,
    IUserLog
  >(auth.login, {
    // SET THE NEW DATAS IN THE REDUX STORE
    onSuccess: (data) => {
      dispatchLogin(data);
      router.push(`/profil/${data.id as string}`);
    },
  });

  // IF THE ID IS UNDIFINED ON SUBMIT WE CREATE A NEW USER
  const { mutateAsync: createData, error } = useMutation(user.post, {
    onSuccess: (data) => {
      mutate({ username: data.username, password });
      setMessage('Something goes wrong :( Please try later');
      setIsModal(true);
    },
  });

  // IF THE ID IS DIFINED ON SUBMIT WE UPDATE THE USER
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
    onError: (err) => {
      if (err.response?.statusText === 'Internal Server Error') {
        setIsModal(true);
        setMessage('Oups email or username already use');
      } else {
        router.push('/error');
      }
    },
  });

  // WE UPDATE THE USER'S PASSWORD
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

    // CHECK IF THE NEW PASSWORD IS DIFFERENT THAN THE OLDER
    if (passwordsToCompare.oldPassword === passwordsToCompare.password) {
      setError('password', {
        message: 'The new password is the same as the older',
      });
      // SAME FOR THE CONFIRM PASSWORD
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
    return <Loader />;
  }
  if (formationsError || isError || usertoUpdateError) {
    router.push('/error');
  }
  return (
    <div className="px-4 lg:px-0 pb-28 lg:pb-14 bg-black">
      {isModal && (
        <Modal
          setIsModal={setIsModal}
          title="Every things geos well"
          buttons={
            !error
              ? [
                  {
                    text: 'ok',
                    handleClick: () => {
                      if (message === 'Oups email or username already use') {
                        window.location.reload();
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
        className="w-full"
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
            className="text-pink underline rounded-md mt-5"
            type="button"
          >
            EditPassword
          </button>
        )}

        <button
          className="w-full p-2 rounded-sm mt-5 lg:mt-5  text-pink border border-pink"
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
