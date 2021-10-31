import React from 'react';

interface IProps {
  user: IUserPost;
}

function AvatarUser({ user }: IProps): JSX.Element {
  return (
    <div className="flex items-center mx-3 py-3">
      <div
        className="h-14 w-14 rounded-full border border-white"
        style={{
          backgroundImage: `url(${user.avatarUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <p className="ml-4 text-sm">{user.username}</p>
    </div>
  );
}

export default AvatarUser;
