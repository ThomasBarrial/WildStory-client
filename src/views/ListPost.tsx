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
  if (data.length === 0) return <p className="mt-10">No post</p>;

  // ORDER THE POST BY THERE DATE FROM THE OLDER THE YOUNGER
  data.sort(
    (date1, date2) =>
      new Date(date1.createdAt).setHours(0, 0, 0, 0) -
      new Date(date2.createdAt).setHours(0, 0, 0, 0)
  );

  // THEN REVERSE THE POST'S ARRAY TO RENDER THE YOUNGER ONE IN FIRST
  const reverseData = [...data].reverse();

  return (
    <div className="w-full pt-3 lg:pt-0 pb-20">
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
