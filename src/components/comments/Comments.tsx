import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { post } from '../../API/request';
import Comment from './components/Comment';
import Header from './components/Header';
import NewComment from './components/NewComment';
import PostDetails from './components/PostDetails';

function Comments(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useQuery<IPost, AxiosError>('post', () =>
    post.getOne(id)
  );
  console.log(data);
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }

  console.log(data);
  return (
    <div>
      <Header />
      <div className="py-16">
        <PostDetails data={data} />
        {data.comments.map((item) => {
          return (
            <div key={item.postId}>
              <Comment item={item} />
            </div>
          );
        })}
      </div>
      <NewComment />
    </div>
  );
}

export default Comments;
