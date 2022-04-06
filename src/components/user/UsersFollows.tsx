import React from 'react';

interface IProps {
  followers: number | undefined;
  following: number | undefined;
  postsNumber: number | undefined;
}

function UsersFollows({
  followers,
  following,
  postsNumber,
}: IProps): JSX.Element {
  return (
    <div className="flex">
      <div className="flex items-end">
        <div className="flex items-center  mr-2">
          <p className="text-sm mr-2">Followers </p>
          <p className="text-sm font-bold">{followers}</p>
        </div>
        <div className="flex items-center  mx-2">
          <p className="text-sm mr-2">Followings </p>
          <p className="text-sm font-bold">{following}</p>
        </div>
        <div className="flex items-center  mx-2">
          <p className="text-sm mr-2">stories</p>
          <p className="text-sm font-bold">{postsNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default UsersFollows;
