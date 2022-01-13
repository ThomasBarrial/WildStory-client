import React, { useState } from 'react';
import { useParams } from 'react-router';
import edit from '../../assets/icons/edit.svg';
import { useUserFromStore } from '../../store/user.slice';
import UserModal from '../modal/UserModal';
import defaultLanding from '../../assets/defaultLanding.png';
import defaultAvatar from '../../assets/defaultAvatar.png';

interface IProps {
  userAvatar: string | undefined;
  userLanding: string | undefined;
}

function UserAssets({ userAvatar, userLanding }: IProps): JSX.Element {
  const [isLandingUpdate, setIsLandingUpdate] = useState(false);
  const [isAvatarUpdate, setIsAvatarUpdate] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { user } = useUserFromStore();

  return (
    <div className="w-full flex flex-col mt-5 items-end">
      {isLandingUpdate && (
        <UserModal label="landing" isOpen={setIsLandingUpdate} />
      )}
      {isAvatarUpdate && (
        <UserModal label="avatar" isOpen={setIsAvatarUpdate} />
      )}
      <div
        className="w-full flex p-3 border-none rounded-t-md  items-end h-44 lg:h-52 border-b lg:border-none"
        style={{
          backgroundImage: `url(${
            userLanding === null || userLanding === undefined
              ? defaultLanding
              : userLanding
          })`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="h-full w-full  inset-0 absolute"
          style={{
            backgroundColor:
              'linear-gradient(360deg, #404040 -19.25%, rgba(255, 255, 255, 0) 73.95%)',
          }}
        />
        {id === user.id && (
          <button
            className="z-10"
            type="button"
            onClick={() => setIsLandingUpdate(true)}
          >
            <img
              className="h-6 w-6  transform translate-y-6  duration-500 hover:scale-125"
              src={edit}
              alt="edit"
            />
          </button>
        )}
      </div>
      <div
        className="w-24 h-24 flex items-end z-20 bg-black rounded-full border border-pink mr-6 transform -translate-y-12"
        style={{
          backgroundImage: `url(${
            userAvatar === null || userAvatar === undefined
              ? defaultAvatar
              : userAvatar
          })`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {id === user.id && (
          <button type="button" onClick={() => setIsAvatarUpdate(true)}>
            <img
              className="h-6 w-6 transform -translate-y-2 -translate-x-2  duration-500 hover:scale-125"
              src={edit}
              alt="edit"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default UserAssets;
