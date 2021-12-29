import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { topics } from '../API/request';
import OnePost from '../components/post/OnePost';

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
    return <p>Loading</p>;
  }
  if (topicsError || !topicsData || postsError || !postsData) {
    return <p>Error..</p>;
  }

  return (
    <div className="mt-5  lg:bg-dark rounded-lg lg:px-0">
      <div className="p-4 lg:mx-4 flex items-end justify-between border-b border-pink">
        <h4 className="text-2xl mt-2 ">{topicsData.topicsName}</h4>
        <h4>Topics</h4>
      </div>
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
