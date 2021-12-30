/* eslint-disable react/jsx-curly-brace-presence */
import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { post } from '../../API/request';
import OnePost from '../post/OnePost';

function UserPost({ userId }: { userId: string | undefined }): JSX.Element {
  const { data, isLoading, error } = useQuery<IPost[], AxiosError>(
    ['userPost', userId],
    () => post.getUserPost(userId as string)
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }

  return (
    <div className="mt-5 transform -translate-y-16">
      <div className="flex border-b pb-2 px-4 lg:px-0 border-pink">
        <p className="mr-3">Recents stories</p>
      </div>
      {data.length === 0 && (
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
