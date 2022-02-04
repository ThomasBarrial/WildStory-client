import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { follows } from '../../API/request';
import AvatarUser from '../post/AvatarUser';

interface IProps {
  item: IFollow;
  isFollower: boolean;
}

function Follower({ item, isFollower }: IProps): JSX.Element {
  const queryclient = useQueryClient();
  const { mutateAsync: deleteFollow } = useMutation(
    () => follows.delete(item.id as string),
    {
      onSuccess: () => {
        if (isFollower) {
          queryclient.refetchQueries(['getUserFollowers']);
        } else {
          queryclient.refetchQueries(['getUserFollowings']);
        }
      },
    }
  );

  return (
    <div className="my-2 flex w-full items-center justify-between border-b border-pink border-opacity-50">
      <AvatarUser userId={isFollower ? item.followerId : item.followingId} />
      <button
        onClick={() => {
          deleteFollow();
        }}
        type="button"
        className="text-pink text-xs"
      >
        {isFollower ? <p> Delete follower</p> : <p>Delete following</p>}
      </button>
    </div>
  );
}

export default Follower;
