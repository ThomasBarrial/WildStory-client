import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { likes, post } from '../../API/request';
import like from '../../assets/icons/like.svg';
import unlike from '../../assets/icons/unlike.svg';
import { useUserFromStore } from '../../store/user.slice';

interface IProps {
  item: IPost;
}

function TextPost({ item }: IProps): JSX.Element {
  const [isLike, setIsLike] = useState(false);
  const [istext, setIsText] = useState(true);
  const [userLike, setUserlike] = useState<ILikes>();
  const [count, setCount] = useState(0);
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();
  const { mutateAsync: createLike } = useMutation(likes.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['getLikes']);
      setIsLike(true);
    },
  });

  const { mutateAsync: updateLike } = useMutation(likes.update, {
    onSuccess: () => {
      queryclient.refetchQueries(['getLikes']);
      setIsLike((prev) => !prev);
    },
  });
  const { isLoading, error, data } = useQuery<ILikes[], AxiosError>(
    ['getLikes', item.id],
    () => post.getLikes(item.id),
    {
      onSuccess: (likeRes) => {
        const checklikes = likeRes.filter((l) => l.isLike === true);
        setCount(checklikes.length);
        const checkUserLike = likeRes.filter((u) =>
          u.userId.includes(user.id as string)
        );
        const checkPostlike = likeRes.filter((p) => p.postId.includes(item.id));

        if (checkPostlike.length !== 0 && checkUserLike.length !== 0) {
          if (checkPostlike[0].isLike === true) {
            setIsLike(true);
          } else {
            setIsLike(false);
          }
        }
        setUserlike(checkPostlike[0]);
      },
    }
  );

  const onLike = () => {
    if (!isLike && !userLike) {
      const likesData = {
        userId: user.id as string,
        postId: item.id,
        isLike: true,
      };
      createLike({ likesData });
    } else if (userLike?.isLike === true) {
      const likesData = {
        userId: user.id as string,
        postId: item.id,
        isLike: false,
      };
      updateLike({ likesData, id: userLike.id });
    } else if (userLike?.isLike === false) {
      const likesData = {
        userId: user.id as string,
        postId: item.id,
        isLike: true,
      };
      updateLike({ likesData, id: userLike.id });
    }
  };

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }

  return (
    <div className="mx-3 lg:mx-0 pb-5">
      <div className="flex justify-between">
        <h3 className="text-lg">{item.title}</h3>
        <div className="flex">
          <p className="text-base mx-2">{count}</p>
          <button type="button" onClick={() => onLike()}>
            {isLike ? (
              <img className="h-5 w-5" src={like} alt="like" />
            ) : (
              <img className="h-5 w-5" src={unlike} alt="unlike" />
            )}
          </button>
        </div>
      </div>
      <p className="text-xs mt-3">
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
      <button
        onClick={() => setIsText((c) => !c)}
        type="button"
        className="text-sm underline"
      >
        {istext ? 'Plus..' : 'moins'}
      </button>
    </div>
  );
}

export default TextPost;
