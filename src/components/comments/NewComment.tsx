import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { comment } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import ErrorPageToast from '../errors/ErrorToast';

interface IProps {
  idPost: string | undefined;
}

export default function NewComment({ idPost }: IProps): JSX.Element {
  const { register, handleSubmit } = useForm();
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();

  const {
    mutate: postComment,
    isLoading,
    isError,
  } = useMutation(comment.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['getComments']);
    },
  });

  const onSubmit = (formData: { text: string }) => {
    let postId = '';
    if (idPost !== undefined) {
      postId = idPost;
    }

    const commentData = {
      text: formData.text,
      // UserId come from Redux Store
      userId: user.id,
      postId,
    };
    return postComment({ commentData });
  };

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (isError) {
    toast(<ErrorPageToast />);
  }
  return (
    <div className=" lg:pb-3 w-full">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} action="postComment">
          <div className="flex">
            <textarea
              className="bg-black rounded-sm font-thin text-base text-white border border-pink w-full focus:outline-none h-14 lg:h-16  px-3 py-3"
              id="text"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('text')}
            />
          </div>
          <button
            className="text-lg rounded-sm my-5 border text-pink border-pink w-6/12 py-1"
            type="submit"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
