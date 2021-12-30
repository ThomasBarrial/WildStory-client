import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { topics } from '../API/request';
import OnePost from '../components/post/OnePost';
import back from '../assets/icons/back.svg';

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
    <div className="mt-5 lg:mt-0 mb-20  rounded-lg lg:px-0">
      <div className="flex px-4 lg:px-0 lg:hidden lg:flex-row flex-row-reverse justify-between">
        <p>Topics</p>
        <Link className="lg:hidden" to="/topics">
          <img src={back} alt="return" />
        </Link>
      </div>
      <h4 className="text-2xl mt-2 lg:pt-5 px-4 lg:px-0 ">
        {topicsData.topicsName}
        {postsData.length === 0 && (
          <p className="mt-5 text-lg text-pink">
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
