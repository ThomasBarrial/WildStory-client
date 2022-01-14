import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { topics } from '../API/request';
import OnePost from '../components/post/OnePost';
import Error404 from '../components/errors/Error404';

function OneTopic(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  // FETCH THE TOPIC DATA WITH THE ID FROM THE URL
  const {
    data: topicsData,
    isLoading: topicsLoading,
    error: topicsError,
  } = useQuery<ITopics, AxiosError>(['OneTopic', id], () => topics.getOne(id));

  // FETCH THE TOPIC'S POSTS WITH THE ID FROM THE URL
  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery<IPost[], AxiosError>(['postfromatopic', id], () =>
    topics.getPost(id)
  );

  if (topicsLoading || postsLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (topicsError || !topicsData || postsError || !postsData) {
    return <Error404 />;
  }

  return (
    <div className="mt-5 LG:bg-dark  lg:mt-0 mb-20  rounded-md lg:px-0">
      <h4 className="text-2xl mt-2 pt-5 px-4 lg:px-4">
        <p className="text-base">Topics</p>
        <p className="my-5">{topicsData.topicsName}</p>
        {postsData.length === 0 && (
          <p className="py-5 text-lg text-pink">
            There is no story for this topic...
          </p>
        )}
      </h4>
      {postsData.map((item) => {
        return (
          <div key={item.id}>
            <OnePost item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default OneTopic;
