import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { post } from '../API/request';
import Error404 from '../components/errors/Error404';
import OnePost from '../components/post/OnePost';

function DeletePostConfirmation(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const router = useHistory();

  const { mutateAsync, error } = useMutation(() => post.delete(id), {
    onSuccess: () => {
      router.goBack();
    },
  });

  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = useQuery<IPost, AxiosError>(['post', id], () => post.getOne(id));

  if (postLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (postError || !postData || error) {
    return <Error404 />;
  }

  return (
    <div className="mt-5 pb-5  border-b border-pink lg:border-none  lg:bg-dark lg:rounded-lg ">
      <div className="lg:p-7 p-5">
        <h3>Are you sure you want to delete this story ?</h3>
        <div className="mt-5">
          <button
            onClick={() => mutateAsync()}
            className={`focus:outline-none border text-pink border-pink  transform hover:bg-pink hover:text-white  hover:scale-95 duration-500 h-10 px-16 rounded-md mr-5 `}
            type="button"
          >
            Yes
          </button>
          <button
            onClick={() => router.goBack()}
            className={`focus:outline-none border text-pink border-pink  transform hover:bg-pink hover:text-white  hover:scale-95 duration-500 h-10 px-16 rounded-md mr-5 `}
            type="button"
          >
            No
          </button>
        </div>
      </div>
      <OnePost item={postData} />
    </div>
  );
}

export default DeletePostConfirmation;
