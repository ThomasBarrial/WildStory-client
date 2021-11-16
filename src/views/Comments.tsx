import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { post } from '../API/request';
import { useUserFromStore } from '../store/user.slice';
import Comment from '../components/comments/Comment';
import Header from '../components/comments/Header';
import ImageSlider from '../components/post/ImageSlider';
import PostDetails from '../components/comments/PostDetails';
import NewComment from '../components/comments/NewComment';

function Comments(): JSX.Element {
  const [isComment, setIsComment] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { user } = useUserFromStore();
  const IdUserFormStore = user.id;
  const { isLoading, error, data } = useQuery<IComments[], AxiosError>(
    ['getComments', id],
    () => post.getComments(id),
    {
      onSuccess: (commentRes) => {
        const checkComments = commentRes.filter((com) =>
          com.userId.includes(IdUserFormStore)
        );
        if (checkComments.length !== 0) {
          setIsComment(true);
        } else {
          setIsComment(false);
        }
      },
    }
  );

  const { data: postData } = useQuery<IPost, AxiosError>(['post', id], () =>
    post.getOne(id)
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }

  return (
    <div className="flex md:w-10/12 lg:w-6/12 mx-auto  w-full">
      <Header />
      <div className="py-20">
        {postData?.imageUrl.length !== 0 && <ImageSlider item={postData} />}
        <PostDetails postData={postData} />
        {!isComment && IdUserFormStore !== postData?.userId && (
          <NewComment idPost={id} />
        )}
        <div className="border-t border-pink pt-2 mx-3 lg:mx-0">
          {data.map((item) => {
            return (
              <div key={item.id}>
                <Comment item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comments;
