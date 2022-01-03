import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { likes, post, savePost } from '../../API/request';
import like from '../../assets/icons/like.svg';
import unlike from '../../assets/icons/unlike.svg';
import { useUserFromStore } from '../../store/user.slice';
import save from '../../assets/icons/save.svg';
import saved from '../../assets/icons/saved.svg';
import Loader from '../loader/Loader';

interface IProps {
  item: IPost;
}

function TextPost({ item }: IProps): JSX.Element {
  const [isLike, setIsLike] = useState(false);
  const router = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const [savedPostId, setSavedPostId] = useState('');
  const [istext, setIsText] = useState(true);
  const [userLike, setUserlike] = useState<ILikes>();
  const [count, setCount] = useState(0);
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();

  // CREATE A NEW LIKE
  const { mutateAsync: createLike } = useMutation(likes.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['getLikes']);
      setIsLike(true);
    },
  });

  // UPDATE EXISTING LIKE
  const { mutateAsync: updateLike } = useMutation(likes.update, {
    onSuccess: () => {
      queryclient.refetchQueries(['getLikes']);
      setIsLike((prev) => !prev);
    },
  });

  // CREATE A NEW SAVEDPOST
  const { mutateAsync: createSavePost } = useMutation(savePost.post, {
    onSuccess: () => {
      setIsSaved(true);
      queryclient.refetchQueries(['getUsersSavedPost']);
    },
  });

  // FETCH ALL USER'S SAVEDPOST
  const { isLoading: savePostLoading, error: savePostError } = useQuery<
    ISavePost[],
    AxiosError
  >(
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
  const { mutateAsync: deleteSavedPost } = useMutation(
    () => savePost.delete(savedPostId),
    {
      onSuccess: () => {
        setIsSaved(false);
        queryclient.refetchQueries(['getUsersSavedPost']);
      },
    }
  );

  // FECTH ALL THE POST'S LIKES
  const {
    isLoading: likesIsLoading,
    error: likesError,
    data,
  } = useQuery<ILikes[], AxiosError>(
    ['getLikes', item.id],
    () => post.getLikes(item.id),
    {
      onSuccess: (likeRes) => {
        // FILTER ALL LIKES WHERE ISLIKE VARIABLES IS TRUE AND SET THE COUNT OF LIKE WITH THE ARRAY'S LENGHT
        const checklikes = likeRes.filter((l) => l.isLike === true);
        setCount(checklikes.length);
        // CHECK IF THE USER ALREADY LIKE THIS POST
        const checkUserLike = likeRes.filter((u) =>
          u.userId.includes(user.id as string)
        );
        // CHANGE THE LIKE STATE IN FUNCTION OFF THE "ISLIKE" VARIABLE
        if (checkUserLike.length !== 0) {
          // IF A USERLIKE EXIST ON THIS POST SO WE SET THE USERLIKE STATE
          setUserlike(checkUserLike[0]);
          if (checkUserLike[0].isLike === true) {
            setIsLike(true);
          } else {
            setIsLike(false);
          }
        }
      },
    }
  );

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

  const onLike = () => {
    // IF THE USER NEVER LIKE THE POST CREATE A NEW LIKE
    if (!isLike && !userLike) {
      const likesData = {
        userId: user.id as string,
        postId: item.id,
        isLike: true,
      };
      createLike({ likesData });
      // IF THE USER ALREADY LIKE THE POST, UPDATE THE EXISTING LIKE TO ISLIKE = FALSE
    } else if (userLike?.isLike === true) {
      const likesData = {
        userId: user.id as string,
        postId: item.id,
        isLike: false,
      };
      updateLike({ likesData, id: userLike.id });
      // IF THE USER ALREADY UNLIKE THE POST UPDATE THE EXISTING LIKE TO ISLIKE = TRUE
    } else if (userLike?.isLike === false) {
      const likesData = {
        userId: user.id as string,
        postId: item.id,
        isLike: true,
      };
      updateLike({ likesData, id: userLike.id });
    }
  };

  if (likesIsLoading || savePostLoading || savePostError) {
    return <Loader />;
  }
  if (likesError || !data) {
    router.push('/error');
  }

  return (
    <div className="mx-3 lg:mx-0 pb-5">
      <div className="flex justify-between">
        <div className="flex">
          <button
            type="button"
            onClick={() => {
              if (user.logged === true) {
                onLike();
              }
            }}
          >
            {isLike ? (
              <img className="h-5 w-5" src={like} alt="like" />
            ) : (
              <img className="h-5 w-5" src={unlike} alt="like" />
            )}
          </button>
          <p className="text-base ml-1">{count}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (user.logged === true) {
              onSavePost();
            }
          }}
        >
          <img className="h-5" src={isSaved ? saved : save} alt="Save" />
        </button>
      </div>
      <p className="text-xs font-bold mt-3">
        posted : {new Date(item.createdAt).toLocaleDateString('fr-FR')}
      </p>
      <p
        className={`text-sm mt-1 font-thin leading-7 lg:leading-loose ${
          istext && 'max-h-28 overflow-hidden'
        }
     `}
      >
        {item.text}
      </p>
      {item.text.split('').length > 450 && (
        <button
          onClick={() => setIsText((c) => !c)}
          type="button"
          className="text-sm underline"
        >
          {istext ? 'Plus..' : 'moins'}
        </button>
      )}
    </div>
  );
}

export default TextPost;
