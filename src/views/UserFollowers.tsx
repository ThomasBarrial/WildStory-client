/* eslint-disable react/jsx-curly-brace-presence */
import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { follows } from '../API/request';
import Follower from '../components/user/Follower';

function UserFollowers(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const {
    data: userFollowers,
    isLoading: followersLoading,
    isError: followersError,
  } = useQuery<IFollow[], AxiosError>(['getUserFollowers', id], () =>
    follows.getUserFollowers(id as string)
  );

  const {
    data: userFollowings,
    isLoading: followingsLoading,
    isError: followingsError,
  } = useQuery<IFollow[], AxiosError>(['getUserFollowings', id], () =>
    follows.getUserFollowings(id as string)
  );

  if (followersLoading || followingsLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (followersError || followingsError) {
    toast('Oops something bad happen');
  }

  return (
    <div className="p-4 mt-5 lg:bg-dark rounded-md">
      <div className="flex items-center text-xl border-b border-pink pb-2">
        {pathname === `/userfollowings/${id}` ? (
          <div className="flex">
            {' '}
            <h4>Followings</h4>
            <p className="ml-2">{userFollowings?.length}</p>
          </div>
        ) : (
          <div className="flex">
            <h4>Followers</h4>
            <p className="ml-2">{userFollowers?.length}</p>
          </div>
        )}
      </div>
      <div className="mt-5">
        {pathname === `/userfollowings/${id}` ? (
          <div>
            {userFollowings?.length === 0 && (
              <p className="my-5 text-pink">{`You don't have any followers for now...`}</p>
            )}{' '}
            {userFollowings?.map((item) => {
              return (
                <div key={item.id}>
                  <Follower item={item} isFollower={false} />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {userFollowers?.length === 0 && (
              <p className="my-5 text-pink">{`You don't have any followers for now...`}</p>
            )}
            {userFollowers?.map((item) => {
              return (
                <div key={item.id}>
                  <Follower item={item} isFollower />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserFollowers;
