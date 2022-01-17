import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { likes, post } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import SignInError from '../errors/SignInError';
import like from '../../assets/icons/like.svg';
import unlike from '../../assets/icons/unlike.svg';

interface IProps {
  item: IPost;
}

function Likes({ item }: IProps): JSX.Element {
  const [userLike, setUserlike] = useState<ILikes>();
  const [isLike, setIsLike] = useState(false);
  const { user } = useUserFromStore();
  const [count, setCount] = useState(0);
  const queryclient = useQueryClient();

  // FECTH ALL THE POST'S LIKES
  const { isLoading: likesIsLoading, error: likesError } = useQuery<
    ILikes[],
    AxiosError
  >(['getLikes', item.id], () => post.getLikes(item.id), {
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
  });

  // UPDATE EXISTING LIKE
  const { mutateAsync: updateLike, isError: updateLikeError } = useMutation(
    likes.update,
    {
      onSuccess: () => {
        queryclient.refetchQueries(['getLikes']);
        setIsLike((prev) => !prev);
      },
    }
  );

  // CREATE A NEW LIKE
  const { mutateAsync: createLike, isError: createLikeError } = useMutation(
    likes.post,
    {
      onSuccess: () => {
        queryclient.refetchQueries(['getLikes']);
        setIsLike(true);
      },
    }
  );

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

  if (likesIsLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (likesError || createLikeError || updateLikeError) {
    toast(<p className="text-sm text-pink">...Oops something went wrong</p>);
  }
  return (
    <div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => {
            if (user.logged === true) {
              onLike();
            } else {
              toast(<SignInError />);
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
        <p className="text-sm ml-2">Likes</p>
      </div>
    </div>
  );
}

export default Likes;
