import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { comment } from '../../../API/request';

export default function NewComment(): JSX.Element {
  const [isNewComment, setIsNewComment] = useState(false);
  const { register, handleSubmit } = useForm();

  //   const { mutate: postComment, error: postError } = useMutation(comment.post);

  //   const commentData;

  //   const onSubmit = (commentData) => {};
  return (
    <div className="bg-pink absolute px-4 w-full rounded-t-xl bottom-3">
      <button
        onClick={() => setIsNewComment(true)}
        className="text-lg mb-2 font-bold text-black"
        type="button"
      >
        New Comment...
      </button>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} action="postComment">
          <textarea
            className="bg-black w-full rounded-xl h-24 px-3 py-3 text-lg"
            id="text"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('text')}
          />
          <button
            className="text-lg rounded-xl mt-5 mb-2 bg-black w-full py-2"
            type="submit"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
