import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { post } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import ImageSlider from '../post/components/ImageSlider';
import Comment from './components/Comment';
import Header from './components/Header';
import NewComment from './components/NewComment';
import PostDetails from './components/PostDetails';

function Comments(): JSX.Element {
  const [isComment, setIsComment] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { user } = useUserFromStore();
  const idUser = user.id;
  const { isLoading, error, data } = useQuery<IComments[], AxiosError>(
    'getComments',
    () => post.getComments(id),
    {
      onSuccess: (commentRes) => {
        const checkComments = commentRes.filter((com) =>
          com.userId.includes(idUser)
        );
        if (checkComments.length !== 0) {
          setIsComment(true);
        } else {
          setIsComment(false);
        }
      },
    }
  );
  const { data: postData } = useQuery<IPost, AxiosError>('post', () =>
    post.getOne(id)
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  const tab = data;
  const revtab = [...tab].reverse();

  return (
    <div className="flex justify-center w-full">
      {postData?.imageUrl.length !== 0 && (
        <div className="hidden lg:flex  lg:w-6/12 pt-16 px-5">
          <ImageSlider item={postData} />
        </div>
      )}
      <div className="lg:w-6/12  lg:mr-5">
        <Header />
        <div className="h-comment overflow-y-scroll">
          <PostDetails postData={postData} />
          {!isComment && idUser !== postData?.userId && (
            <NewComment idPost={id} />
          )}
          <div className="border-t border-pink pt-2 mx-3">
            {revtab.map((item) => {
              return (
                <div key={item.id}>
                  <Comment item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
