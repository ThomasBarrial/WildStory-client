/* eslint-disable react/jsx-curly-brace-presence */
import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { post } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import ErrorPageToast from '../errors/ErrorToast';
import OnePost from '../post/OnePost';

interface IProps {
  userId: string | undefined;
}

function UserPost({ userId }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IPost[], AxiosError>(
    ['userPost', userId],
    () => post.getUserPost(userId as string)
  );

  const { user: userStore } = useUserFromStore();

  if (isLoading) {
    return (
      <div>
        <p className="text-pink animate-pulse p-5">...Loading</p>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="p-5">
        <ErrorPageToast />
      </div>
    );
  }

  return (
    <div className="my-5 mb-20">
      {data.length === 0 && userStore.id === userId && (
        <div className="text-pink flex text-sm mt-2">
          <p>{`You don't post any stories for now.`}</p>
          <Link className="underline ml-2" to="/newpost">
            Create your first story
          </Link>
        </div>
      )}
      <div className="flex w-full flex-col">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <OnePost item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserPost;
