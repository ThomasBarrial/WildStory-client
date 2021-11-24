/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from '../API/request';
import logo from '../assets/logo3.png';
import img from '../assets/img1.webp';
import { UserState, useUserFromStore } from '../store/user.slice';

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

  if (isLoading) return <p>...Loading</p>;

  return (
    <div className="w-sreen font-lexend flex items-center justify-center h-full  bg-black fixed inset-0 z-50 overflow-y-scroll">
      <div className="flex flex-col lg:flex-row ">
        <img className="hidden lg:flex lg:mr-5" src={img} alt="" />
        <form
          className="w-full lg:ml-5 flex px-5 sm:w-6/12 justify-center items-start sm:items-start flex-col text-white font-roboto text-xl sm:text-2xl"
          onSubmit={handleSubmit(onSubmit)}
          action="login"
        >
          <img
            className="h-16  transform -translate-x-2 lg:-translate-x-5 lg:h-20"
            src={logo}
            alt="WildStory"
          />
          <p className="mt-5 text-sm text-left lg:text-sm">
            Take part in a network of digital players all over Europe
          </p>
          <label
            className="mt-5 lg:mt-5  w-full  text-sm flex flex-col"
            htmlFor="username"
          >
            Username
            <input
              className=" focus:outline-none border-white p-2 bg-black rounded-md border mt-2 "
              type="text"
              {...register('username', { required: true })}
            />
          </label>
          <label
            className="mt-5 w-full  text-sm flex flex-col"
            htmlFor="Password"
          >
            Password{' '}
            <input
              className=" focus:outline-none border-white p-2 bg-black rounded-md border mt-2 "
              type="password"
              {...register('password', { required: true })}
            />
          </label>
          {isError && (
            <p className="text-red-500 w-full  text-left text-xs mt-2">
              wrong credentials try again
            </p>
          )}
          <button
            type="submit"
            className="w-full  text-sm p-2  mt-10 lg:mt-10 bg-pink"
          >
            Login
          </button>

          <div className="flex w-full mt-1 lg:w-8/12  text-xs font-bold items-start">
            <p>Need a new account</p>
            <Link to="/signup">
              <button
                className="font-bold text-pink ml-2 underline"
                type="button"
              >
                Signup
              </button>
            </Link>
          </div>
          <div className="text-xs w-full items-start flex  mt-10">
            <p>In collaboration with</p>
            <a
              href="https://digitalcopilote.io/"
              target="_blank"
              rel="noreferrer"
              className="text-pink ml-2 underline"
            >
              @DigitalCopilote
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
