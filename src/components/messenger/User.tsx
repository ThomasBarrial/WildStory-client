import React from 'react';
import defaultAvatar from '../../assets/defaultAvatar.png';

interface IProps {
  item: IUser;
}

function User({ item }: IProps): JSX.Element {
  return (
    <div className="flex w-full mt-3 items-center mx-3 lg:mx-0 pb-3 border-b border-pink border-opacity-50">
      <div
        className="h-12 w-12 rounded-full border border-pink"
        style={{
          backgroundImage: `url(${
            item.avatarUrl === null || item.avatarUrl === undefined
              ? defaultAvatar
              : item.avatarUrl
          })`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div className="flex ml-3 w-6/12 flex-col items-start">
        <p className="">{item.username}</p>
      </div>
    </div>
  );
}

export default User;
