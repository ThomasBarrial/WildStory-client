/* eslint-disable react/jsx-curly-brace-presence */
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { post, savePost } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import ErrorPageToast from '../errors/ErrorToast';
import OnePost from '../post/OnePost';
import SavedPost from './SavedPost';

function UserPost({ userId }: { userId: string | undefined }): JSX.Element {
  const [isRecentStories, setIsRecentStories] = useState(true);
  const { data, isLoading, error } = useQuery<IPost[], AxiosError>(
    ['userPost', userId],
    () => post.getUserPost(userId as string)
  );

  const {
    isLoading: savePostLoading,
    error: savePostError,
    data: savedPostData,
  } = useQuery<ISavePost[], AxiosError>(['getUsersSavedPost', userId], () =>
    savePost.getUserSavedPost(userId as string)
  );

  const { user: userStore } = useUserFromStore();

  if (isLoading || savePostLoading) {
    return (
      <div>
        <p className="text-pink animate-pulse pb-10">...Loading</p>
      </div>
    );
  }
  if (error || !data || !savedPostData || savePostError) {
    return (
      <div className="pb-10">
        <ErrorPageToast />
      </div>
    );
  }

  return (
    <div className="mt-5 transform -translate-y-16">
      <div className="flex items-center border-b pb-2 px-4 lg:px-0 border-pink">
        <button
          type="button"
          onClick={() => setIsRecentStories(true)}
          className={`mr-5 ${
            isRecentStories ? 'text-pink' : 'text-white text-sm'
          }`}
        >
          Recents stories
        </button>
        <button
          type="button"
          onClick={() => setIsRecentStories(false)}
          className={!isRecentStories ? 'text-pink' : 'text-white text-sm'}
        >
          Saved stories
        </button>
      </div>
      {data.length === 0 && userStore.id === userId && (
        <div className="text-pink flex text-sm mt-2">
          <p>{`You don't post any stories for now.`}</p>
          <Link className="underline ml-2" to="/newpost">
            Create your first story
          </Link>
        </div>
      )}
      {isRecentStories ? (
        <div className="flex w-full flex-col">
          {data.map((item) => {
            return (
              <div key={item.id}>
                <OnePost item={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-full flex-col">
          {[...savedPostData].reverse().map((item) => {
            return (
              <div key={item.id}>
                <SavedPost postId={item.postId} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserPost;
