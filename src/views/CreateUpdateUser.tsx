/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
// import { useUserFromStore } from '../store/user.slice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import HeaderSettings from '../components/user/headerSettings/HeaderSettings';

import TextInput from '../components/forms/TextInput';
import { formation, user } from '../API/request';
import DateInput from '../components/forms/DateInput';
import { formInputs } from '../components/forms/FormInputs';

import PasswordForm from '../components/forms/PasswordForm';
import SelectInput from '../components/forms/SelectInput';
import HeaderUser from '../components/forms/HeaderUser';

function CreateUpdateUser(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  // const { user: userFromStore } = useUserFromStore();
  const [landingUrl, setLandingUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const router = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(id);
  // const {
  //   data: skillData,
  //   isLoading: skillsLoad,
  //   error: skillsError,
  // } = useQuery<ISkills[], AxiosError>(['Skills'], () => skills.getAll());

  const {
    data: formationData,
    isLoading: formationsLoad,
    error: formationsError,
  } = useQuery<IFormation[], AxiosError>(['formations'], () =>
    formation.getAll()
  );

  const { mutateAsync: createData, error: postError } = useMutation(user.post, {
    onSuccess: (data) => {
      router.push(`/createuserskills/${data.id}`);
    },
  });

  const onSubmit: SubmitHandler<INewUser> = (data: INewUser) => {
    const UserData = {
      profilTitle: data.profilTitle,
      username: data.username,
      email: data.email,
      password: data.password,
      city: data.city,
      birthDate: data.birthDate,
      avatarUrl,
      landimageUrl: landingUrl,
      idFormation: data.idFormation,
    };
    return createData({ UserData });
  };

  if (formationsLoad) {
    return <p>...Loading</p>;
  }
  if (formationsError || postError) {
    return <p>Error</p>;
  }
  return (
    <div className="w-sreen h-screen pb-20 bg-black fixed inset-0 z-50 overflow-y-scroll">
      <div className="my-14">
        <HeaderUser title="Create your profil" />
        <HeaderSettings
          userAvatar={avatarUrl}
          userLanding={landingUrl}
          setLandingUrl={setLandingUrl}
          setAvatarUrl={setAvatarUrl}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="Create/Update Post"
          className="mx-4 h-full  transform -translate-y-16"
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
          <button className="w-full p-2  mt-5 bg-pink" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUpdateUser;
