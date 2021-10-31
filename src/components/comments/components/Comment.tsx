import React from 'react';

interface IProps {
  item: IComments;
}

function Comment({ item }: IProps): JSX.Element {
  return (
    <div className="flex mx-3 my-5 border-b border-pink pb-3">
      <div
        className="h-12 w-12 rounded-full border border-white"
        style={{
          backgroundImage: `url(${item.user.avatarUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div className="ml-4 w-10/12">
        <p className="text-sm">{item.user.username}</p>
        <p className="text-sm">{item.text}</p>
      </div>
    </div>
  );
}

export default Comment;
