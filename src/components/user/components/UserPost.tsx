import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { post } from '../../../API/request';
import OnePost from '../../post/components/OnePost';
import AllPost from './AllPost';

function UserPost({ userId }: { userId: string }): JSX.Element {
  const [isAllPost, setIsAllPost] = useState(false);
  const { data, isLoading, error } = useQuery<IPost[], AxiosError>(
    ['userPost', userId],
    () => post.getUserPost(userId)
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }

  return (
    <div className="transform -translate-y-16">
      <div className="flex border-b pb-2 px-4 border-pink">
        <button
          onClick={() => setIsAllPost(false)}
          type="button"
          className="mr-3"
        >
          Recents stories
        </button>
        <button
          onClick={() => setIsAllPost(true)}
          type="button"
          className="ml-3"
        >
          All my stories
        </button>
      </div>
      <div
        className={`flex w-full ${
          isAllPost ? 'flex-row flex-wrap' : 'flex-col'
        } `}
      >
        {data.map((item) => {
          return (
            <div className={`${isAllPost && 'w-1/3'}`} key={item.id}>
              {isAllPost ? <AllPost item={item} /> : <OnePost item={item} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserPost;
