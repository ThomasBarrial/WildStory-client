import React, { useState } from 'react';
import { useUserFromStore } from '../../store/user.slice';
import Header from './components/header/Header';

function CreateUpdateUser(): JSX.Element {
  const { user } = useUserFromStore();
  const [landingUrl, setLandingUrl] = useState(user.landimageUrl);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  return (
    <div>
      <Header
        isUpdate
        userAvatar={avatarUrl}
        userLanding={landingUrl}
        setLandingUrl={setLandingUrl}
        setAvatarUrl={setAvatarUrl}
      />
    </div>
  );
}

export default CreateUpdateUser;
