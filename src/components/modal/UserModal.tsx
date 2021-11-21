/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { user } from '../../API/request';
import cross from '../../assets/icons/close.svg';

interface IProps {
  isOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  label: string;
}

function UserModal({ isOpen, label, name }: IProps): JSX.Element {
  const { register, handleSubmit } = useForm();
  const { id } = useParams<{ id: string }>();
  const queryclient = useQueryClient();

  const {
    mutateAsync: editeData,
    isLoading,
    error: putError,
  } = useMutation('userUpdate', user.put, {
    onSuccess: () => {
      isOpen(false);
      queryclient.refetchQueries(['oneUser']);
    },
  });

  const onSubmit: SubmitHandler<IUpdateAssetsUser> = (
    data: IUpdateAssetsUser
  ) => {
    let UserData = {};
    if (data.avatarUrl === undefined) {
      UserData = {
        landimageUrl: data.landimageUrl,
      };
    }
    if (data.landimageUrl === undefined) {
      UserData = {
        avatarUrl: data.avatarUrl,
      };
    }
    return editeData({ UserData, id });
  };

  if (isLoading) {
    return <p>...Loading</p>;
  }
  if (putError) {
    return <p>Error</p>;
  }

  return (
    <div className="w-screen fixed inset-0 z-50 h-full  bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 lg:w-6/12 bg-black border rounded-md border-pink p-5 lg:p-8"
      >
        <div className="w-full">
          <button
            onClick={() => {
              isOpen(false);
            }}
            className="w-full flex justify-end"
            type="button"
          >
            <img src={cross} alt="isOpen" />
          </button>
          <label htmlFor="Landing" className="flex w-full flex-col font-bold">
            Update {label} Image
            <input
              id="landing"
              type="text"
              placeholder="Url..."
              defaultValue=""
              {...register(name, { required: true })}
              className="bg-black mt-2 border rounded-none focus:outline-none p-2 border-white"
            />
          </label>
        </div>
        <p className="mt-2">
          If you need create a url
          <a
            className="ml-2 underline"
            rel="noreferrer"
            target="_blank"
            href="https://fr.imgbb.com/"
          >
            go there
          </a>
        </p>
        <button
          type="submit"
          className="mt-5 border border-white text-white py-2 w-full lg:w-6/12"
        >
          ok
        </button>
      </form>
    </div>
  );
}

export default UserModal;
