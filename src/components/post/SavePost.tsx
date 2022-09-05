import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { savePost } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import SignInError from '../errors/SignInError';
import save from '../../assets/icons/save.svg';
import saved from '../../assets/icons/saved.svg';

interface IProps {
  item: IPost;
}

function SavePost({ item }: IProps): JSX.Element {
  const [isSaved, setIsSaved] = useState(false);
  const [savedPostId, setSavedPostId] = useState('');
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();
  // CREATE A NEW SAVEDPOST
  const { mutateAsync: createSavePost, isError: createSavePostError } =
    useMutation(savePost.post, {
      onSuccess: () => {
        setIsSaved(true);
        queryclient.refetchQueries(['getUsersSavedPost']);
      },
    });

  // FETCH ALL USER'S SAVEDPOST
  const { error: savePostError } = useQuery<ISavePost[], AxiosError>(
    ['getUsersSavedPost', user.id],
    () => savePost.getUserSavedPost(user.id as string),
    {
      onSuccess: (data) => {
        // WHEN THE FETCH IS OK WE CHECK IF THE USER ALREADY SAVE THE POST OR NOT
        const isPostSaved = data.filter((sp) => sp.postId === item.id);
        // IF THE USER SAVE THE POST WE SET THE SAVE VARIABLE TO TRUE
        if (isPostSaved.length !== 0) {
          setSavedPostId(isPostSaved[0].id as string);
          setIsSaved(true);
        }
      },
    }
  );
  // DELETE THE SAVEDPOST
  const { mutateAsync: deleteSavedPost, isError: deleteSavePostError } =
    useMutation(() => savePost.delete(savedPostId), {
      onSuccess: () => {
        setIsSaved(false);
        queryclient.refetchQueries(['getUsersSavedPost']);
      },
    });
  const onSavePost = () => {
    // IF THE POST IS ALREADY SAVE BY THE USER WE DELETE THE RELATED SAVED POST
    if (isSaved) {
      deleteSavedPost();
      // ELSE WE CREATE A NEW SAVED POST
    } else {
      const savePostData = {
        userId: user.id as string,
        postId: item.id,
      };
      createSavePost({ savePostData });
    }
  };

  if (createSavePostError || deleteSavePostError) {
    toast(<p className="text-sm text-pink">...Oops something went wrong</p>);
  }
  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={() => {
          if (user.logged === true) {
            onSavePost();
          } else {
            toast(<SignInError />);
          }
        }}
      >
        {savePostError ? (
          <p className="text-sm text-pink">...Oops something went wrong</p>
        ) : (
          <div className="flex items-center">
            <img className="h-5" src={isSaved ? saved : save} alt="Save" />
            <p className="ml-2 text-sm">Save</p>
          </div>
        )}
      </button>
    </div>
  );
}

export default SavePost;
