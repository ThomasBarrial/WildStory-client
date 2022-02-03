import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { follows, post } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';

interface IProps {
  id: string | undefined;
}

function Follow({ id }: IProps): JSX.Element {
  const { user: userStore } = useUserFromStore();
  const [isFollowed, setIsFollowed] = useState(false);
  const [followId, setFollowId] = useState('');

  const queryclient = useQueryClient();

  const { data: userPost } = useQuery<IPost[], AxiosError>(
    ['userPost', id],
    () => post.getUserPost(id as string)
  );

  const {
    data: userFollowers,
    isLoading: followersLoading,
    isError: followersError,
  } = useQuery<IFollow[], AxiosError>(
    ['getUserFollowers', id],
    () => follows.getUserFollowers(id as string),
    {
      onSuccess: (d) => {
        const checkFollowed = d.filter(
          (item) => item.followerId === userStore.id
        );
        if (checkFollowed.length > 0) {
          setIsFollowed(true);
          setFollowId(checkFollowed[0].id as string);
        }
      },
    }
  );

  const { mutateAsync: deleteFollow } = useMutation(
    () => follows.delete(followId),
    {
      onSuccess: () => {
        setIsFollowed(false);
      },
    }
  );

  const {
    data: userFollowings,
    isLoading: followingsLoading,
    isError: followingsError,
  } = useQuery<IFollow[], AxiosError>(['getUserFollowings', id], () =>
    follows.getUserFollowings(id as string)
  );

  const {
    mutateAsync: postFollow,
    isLoading: postFollowLoading,
    isError: postFollowError,
  } = useMutation(follows.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['getUserFollowers']);
    },
  });

  const onSubmit = () => {
    const followsData = {
      followerId: userStore.id as string,
      followingId: id as string,
    };

    return postFollow({ followsData });
  };

  if (postFollowLoading || followersLoading || followingsLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (postFollowError || followersError || followingsError) {
    toast('Oops something bad happen');
  }

  return (
    <div>
      {isFollowed && userStore.id !== id && (
        <div className="flex">
          <div className="flex items-end">
            <div className="flex items-center mx-2">
              <p className="text-xs mr-2">Followers </p>
              {userFollowers?.length}
            </div>
            <div className="flex items-center mx-2">
              <p className="text-xs mr-2">Followings </p>
              {userFollowings?.length}
            </div>
            <div className="flex items-center mx-2">
              <p className="text-xs mr-2">stories</p>
              {userPost?.length}
            </div>
          </div>
          <div className="flex ml-16 items-end">
            <button
              type="button"
              className="border rounded-sm py-1 px-8 text-sm transform hover:text-pink hover:border-pink duration-300"
            >
              Contact
            </button>
            <button
              onClick={() => deleteFollow()}
              className="text-xs ml-4"
              type="button"
            >
              unfollow
            </button>
          </div>
        </div>
      )}
      {userStore.id !== id && !isFollowed && (
        <button
          onClick={() => onSubmit()}
          type="button"
          className="border rounded-sm py-1 px-8 text-sm transform hover:text-pink hover:border-pink duration-300"
        >
          follow
        </button>
      )}
    </div>
  );
}

export default Follow;
