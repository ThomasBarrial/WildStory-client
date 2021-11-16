import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useUserFromStore } from '../store/user.slice';
import HeaderSettings from '../components/user/headerSettings/HeaderSettings';

function CreateUpdateUser(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const { user: userFromStore } = useUserFromStore();
  const [landingUrl, setLandingUrl] = useState(userFromStore.landimageUrl);
  const [avatarUrl, setAvatarUrl] = useState(userFromStore.avatarUrl);
  console.log(id);
  return (
    <div>
      <HeaderSettings
        userAvatar={avatarUrl}
        userLanding={landingUrl}
        setLandingUrl={setLandingUrl}
        setAvatarUrl={setAvatarUrl}
      />
    </div>
  );
}

export default CreateUpdateUser;
