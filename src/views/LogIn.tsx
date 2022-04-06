/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { auth } from '../API/request';
import img from '../assets/img1.webp';
import { UserState, useUserFromStore } from '../store/user.slice';
import Header from '../components/login/Header';
import Form from '../components/login/Form';
import Footer from '../components/login/Footer';
import Loader from '../components/loader/Loader';

interface IFormInput {
  username: string;
  password: string;
}

interface IResMutation {
  message: string;
  user: IUser;
}

function LogIn(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const { dispatchLogin } = useUserFromStore();

  const { mutate, isLoading, isError } = useMutation<
    IResMutation,
    AxiosError<{ message_en: string; message_fr: string }>,
    IFormInput
  >(auth.login, {
    onSuccess: (data) => {
      dispatchLogin(data as UserState);
      history.push('/');
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = ({ username, password }) => {
    const user = {
      username,
      password,
    };
    mutate(user);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="font-lexend flex items-center justify-center h-full  bg-black fixed inset-0 z-50 overflow-y-scroll">
      <div className="flex flex-col w-full lg:flex-row sm:w-10/12 ">
        <div className="sm:w-6/12 flex justify-end">
          <img className="hidden lg:flex lg:mr-5" src={img} alt="" />
        </div>
        <form
          className="w-full lg:ml-5 flex px-5 sm:w-4/12 justify-center items-start sm:items-start flex-col text-white font-roboto text-xl sm:text-2xl"
          onSubmit={handleSubmit(onSubmit)}
          action="login"
        >
          <Header />
          <Form register={register} isError={isError} required />
          <button
            type="submit"
            className="w-full rounded-md text-sm p-2  mt-10 lg:mt-10 bg-pink"
          >
            Login
          </button>
          <Footer />
        </form>
      </div>
    </div>
  );
}

export default LogIn;
