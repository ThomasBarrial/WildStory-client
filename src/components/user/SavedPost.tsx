import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { post } from '../../API/request';
import OnePost from '../post/OnePost';

function SavedPost({ postId }: { postId: string }): JSX.Element {
  const { isLoading, error, data } = useQuery<IPost, AxiosError>(
    ['getOnePost', postId],
    () => post.getOne(postId)
  );
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  return <OnePost item={data} />;
}

export default SavedPost;
