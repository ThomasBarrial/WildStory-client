import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { post } from '../API/request';
import { useUserFromStore } from '../store/user.slice';
import Comment from '../components/comments/Comment';
import Header from '../components/comments/Header';
import NewComment from '../components/comments/NewComment';
import TextPost from '../components/post/TextPost';
import AvatarUser from '../components/post/AvatarUser';
import Error404 from '../components/errors/Error404';
import ImageSlider from '../components/post/ImageSlider';

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
          com.userId.includes(IdUserFormStore as string)
        );
        if (checkComments.length !== 0) {
          setIsComment(true);
        } else {
          setIsComment(false);
        }
      },
    }
  );

  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = useQuery<IPost, AxiosError>(['post', id], () => post.getOne(id));

  if (isLoading || postLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (error || !data || postError || !postData) {
    return <Error404 />;
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="pb-20 w-full">
        <div className="lg:bg-dark rounded-md lg:p-7">
          <AvatarUser userId={postData?.userId} />
          {postData?.imageUrl.length !== 0 && <ImageSlider item={postData} />}
          {postData && <TextPost item={postData} />}
        </div>
        <div className="lg:bg-dark rounded-md mt-2 lg:p-7 mx-3 lg:mx-0">
          {!isComment &&
            IdUserFormStore !== postData?.userId &&
            user.logged === true && <NewComment idPost={id} />}
          <p className="font-bold text-xl">Comments</p>
          {data.length === 0 && (
            <p className="font-thin mt-5 text-opacity-50 text-pink">
              No comments for now...
            </p>
          )}
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
