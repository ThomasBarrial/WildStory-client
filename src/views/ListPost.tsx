import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { post } from '../API/request';
import OnePost from '../components/post/OnePost';

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
    <div className="w-full h-full lg:w-7/12 md:w-12/12 max-w-5xl md:mx-auto">
      {reverseData?.map((item) => {
        return (
          <div key={item.id}>
            <OnePost item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default ListPost;
