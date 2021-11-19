import React, { Dispatch, SetStateAction, useState } from 'react';

import UserModal from '../../modal/UserModal';
import Avatar from './Avatar';
import Landing from './Landing';

interface IProps {
  userAvatar: string;
  userLanding: string;
  setLandingUrl: Dispatch<SetStateAction<string>>;
  setAvatarUrl: Dispatch<SetStateAction<string>>;
}

function HeaderSettings({
  userAvatar,
  userLanding,
  setAvatarUrl,
  setLandingUrl,
}: IProps): JSX.Element {
  const [isLandingUpdate, setIsLandingUpdate] = useState(false);
  const [isAvatarUpdate, setIsAvatarUpdate] = useState(false);

  return (
    <div className="lg:w-8/12 lg:mx-auto">
      {isLandingUpdate && (
        <UserModal
          label="landing"
          isOpen={setIsLandingUpdate}
          setImage={setLandingUrl}
        />
      )}
      {isAvatarUpdate && (
        <UserModal
          label="avatar"
          isOpen={setIsAvatarUpdate}
          setImage={setAvatarUrl}
        />
      )}
      <Landing isOpen={setIsLandingUpdate} landing={userLanding} />
      <Avatar avatar={userAvatar} isOpen={setIsAvatarUpdate} />
    </div>
  );
}

export default HeaderSettings;
