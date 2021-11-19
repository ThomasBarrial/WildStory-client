import React from 'react';

interface IProps {
  userAvatar: string | undefined;
  userLanding: string | undefined;
}

function Header({ userAvatar, userLanding }: IProps): JSX.Element {
  return (
    <div className="w-full flex flex-col items-end">
      <div
        className="w-full h-32 border-b lg:border border-pink"
        style={{
          backgroundImage: `url(${userLanding})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="w-24 h-24 rounded-full border border-pink mr-6 transform -translate-y-12"
        style={{
          backgroundImage: `url(${userAvatar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}

export default Header;
