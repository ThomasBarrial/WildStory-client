import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { savePost } from '../../API/request';
import ErrorPageToast from '../errors/ErrorToast';
import SavedPost from '../user/SavedPost';

function UserSavedPost({
  userId,
}: {
  userId: string | undefined;
}): JSX.Element {
  const {
    isLoading: savePostLoading,
    error: savePostError,
    data: savedPostData,
  } = useQuery<ISavePost[], AxiosError>(['getUsersSavedPost', userId], () =>
    savePost.getUserSavedPost(userId as string)
  );

  if (savePostLoading) {
    return (
      <div>
        <p className="text-pink animate-pulse p-5">...Loading</p>
      </div>
    );
  }
  if (savePostError || !savedPostData) {
    return (
      <div className="p-5">
        <ErrorPageToast />
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col">
      {[...savedPostData].reverse().map((item) => {
        return (
          <div key={item.id}>
            <SavedPost postId={item.postId} />
          </div>
        );
      })}
    </div>
  );
}

export default UserSavedPost;
