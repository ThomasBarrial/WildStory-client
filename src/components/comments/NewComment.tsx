import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { comment } from '../../API/request';
import down from '../../assets/icons/down.svg';
import { useUserFromStore } from '../../store/user.slice';

interface IProps {
  idPost: string | undefined;
}

export default function NewComment({ idPost }: IProps): JSX.Element {
  const [isNewComment, setIsNewComment] = useState(false);
  const { register, handleSubmit } = useForm();
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();

  const { mutate: postComment } = useMutation(comment.post, {
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
  return (
    <div className=" lg:pb-3 px-4 lg:px-0 w-full">
      <div className="w-full flex items-start justify-between">
        <button
          onClick={() => setIsNewComment(true)}
          className="text-lg mb-2 font-bold text-white"
          type="button"
        >
          Comment this post...
        </button>
        {isNewComment && (
          <button onClick={() => setIsNewComment(false)} type="button">
            <img src={down} alt="down" />
          </button>
        )}
      </div>
      {isNewComment && (
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} action="postComment">
            <textarea
              className="bg-black font-thin text-base text-white border border-pink w-full focus:outline-none h-24 px-3 py-3"
              id="text"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('text')}
            />
            <button
              className="text-lg my-5 border text-pink border-pink w-6/12 py-1"
              type="submit"
            >
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
