import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { follows, post } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import UsersFollows from './UsersFollows';

interface IProps {
  id: string | undefined;
}

function Follow({ id }: IProps): JSX.Element {
  const { user: userStore } = useUserFromStore();
  const [isFollowed, setIsFollowed] = useState(false);

  const queryclient = useQueryClient();

  // GET THE NUMBERS OF THE USER'S STORIES
  const { data: userPost } = useQuery<IPost[], AxiosError>(
    ['userPost', id],
    () => post.getUserPost(id as string)
  );

  // GET THE USERS FOLLOWERS
  const {
    data: userFollowers,
    isLoading: followersLoading,
    isError: followersError,
  } = useQuery<IFollow[], AxiosError>(
    ['getUserFollowers', id],
    () => follows.getUserFollowers(id as string),
    {
      onSuccess: (d) => {
        // CHECK IF THE LOGGED USER ALREADY FOLLOW THIS USER
        const checkFollowed = d.filter(
          (item) => item.followerId === userStore.id
        );
        // IF CHECKFOLLOWED AS UNLESS 1 OBJECT THE LOGGED USER FOLLOW THIS PROFIL
        if (checkFollowed.length > 0) {
          // WE SET FOLLOW STATE TO TRUE
          setIsFollowed(true);
        }
      },
    }
  );

  // GET USER'S FOLLOWINGS
  const {
    data: userFollowings,
    isLoading: followingsLoading,
    isError: followingsError,
  } = useQuery<IFollow[], AxiosError>(['getUserFollowings', id], () =>
    follows.getUserFollowings(id as string)
  );

  // CREATE A FOLLOW BETWEEN THE LOGGED USER AND THE PROFIL
  const {
    mutateAsync: postFollow,
    isLoading: postFollowLoading,
    isError: postFollowError,
  } = useMutation(follows.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['getUserFollowers']);
    },
  });

  // ONCLICK OF THE FOLLOW BUTTON
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
    <div className="flex justify-start pl-4 my-2 lg:m-5 lg:p-0 lg:justify-end">
      {userStore.logged === false ? (
        <UsersFollows
          followers={userFollowers?.length}
          following={userFollowings?.length}
          postsNumber={userPost?.length}
        />
      ) : (
        <>
          {/* IF THE USER IS ALREADY FOLLOW RENDER THIS  */}
          {isFollowed && userStore.id !== id && (
            <UsersFollows
              followers={userFollowers?.length}
              following={userFollowings?.length}
              postsNumber={userPost?.length}
            />
          )}
          {/* IF THE USER ISN'T FOLLOW RENDER THIS  */}
          {userStore.id !== id && !isFollowed && (
            <button
              onClick={() => onSubmit()}
              type="button"
              className="border rounded-md py-1 px-8 text-sm transform hover:text-pink hover:border-pink duration-300"
            >
              follow
            </button>
          )}
          {/* IF THE USER IS ON HIS OWN PROFIL RENDER THIS  */}
          {userStore.id === id && (
            <div className="flex items-end mr-4">
              <div className="flex items-center mr-2">
                <Link
                  to={`/userfollowers/${userStore.id}`}
                  className="text-xs mr-2"
                >
                  Followers{' '}
                </Link>
                <p className="text-xs font-bold lg:text-base">
                  {userFollowers?.length}
                </p>
              </div>
              <div className="flex items-center mx-2">
                <Link
                  to={`/userfollowings/${userStore.id}`}
                  className="text-xs mr-2"
                >
                  Followings{' '}
                </Link>
                <p className="text-xs font-bold lg:text-base">
                  {userFollowings?.length}
                </p>
              </div>
              <div className="flex items-center mx-2">
                <p className="text-xs mr-1 lg:mr-2">stories</p>
                <p className="text-xs font-bold lg:font-normal lg:text-base">
                  {userPost?.length}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Follow;
