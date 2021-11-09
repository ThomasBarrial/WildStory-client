import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { post } from '../../API/request';
import OnePost from './components/OnePost';

function ListPost(): JSX.Element {
  const { isLoading, error, data } = useQuery<IPost[], AxiosError>(
    'posts',
    () => post.getAll()
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  if (data.length === 0) return <p>No post</p>;

  const reverseData = [...data].reverse();
  return (
    <div className="w-full h-full lg:w-7/12 lg:mx-auto">
      {reverseData?.map((item) => {
        return <OnePost item={item} />;
      })}
    </div>
  );
}

export default ListPost;
