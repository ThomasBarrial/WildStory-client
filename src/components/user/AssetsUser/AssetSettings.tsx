import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { user } from '../../../API/request';
import { useUserFromStore } from '../../../store/user.slice';
import HeaderUser from '../../formInputs/HeaderUser';
import UserModal from '../../modal/UserModal';
import Avatar from './Avatar';
import Landing from './Landing';

function AssetSettings(): JSX.Element {
  const router = useHistory();

  const { dispatchLogin } = useUserFromStore();
  const [isLandingUpdate, setIsLandingUpdate] = useState(false);
  const [isAvatarUpdate, setIsAvatarUpdate] = useState(false);

  const { id } = useParams<{ id: string }>();

  const {
    data: userData,
    isLoading: userLoad,
    error: userError,
  } = useQuery<IUser, AxiosError>(['oneUser', id], () => user.getOne(id), {
    enabled: Boolean(id),
    onSuccess: (data) => {
      dispatchLogin(data);
    },
  });

  if (userLoad) {
    return <p>...Loading</p>;
  }
  if (userError) {
    return <p>Error</p>;
  }
  return (
    <div className="w-sreen h-screen py-10 bg-black fixed inset-0 z-50 overflow-y-scroll">
      <HeaderUser userUpdateid={undefined} title="Add Nice Assets" />
      {isLandingUpdate && (
        <UserModal
          name="landimageUrl"
          label="landing"
          isOpen={setIsLandingUpdate}
        />
      )}
      <div className="w-full flex flex-col lg:w-8/12 lg:mx-auto">
        {isAvatarUpdate && (
          <UserModal
            name="avatarUrl"
            label="avatar"
            isOpen={setIsAvatarUpdate}
          />
        )}
        <Landing landing={userData?.landimageUrl} isOpen={setIsLandingUpdate} />
        <div className="w-full flex flex-col items-end">
          <Avatar avatar={userData?.avatarUrl} isOpen={setIsAvatarUpdate} />
        </div>
        <div className="flex flex-col h-full items-end">
          <button
            onClick={() => router.push(`/userskills/${id}`)}
            className="font-bold font-lexend w-full  my-3 lg:mt-0  p-2  border border-white lg:w-4/12"
            type="submit"
          >
            next
          </button>{' '}
          <button
            type="button"
            onClick={() => router.push(`/userskills/${id}`)}
            className="font-bold text-right font-lexend lg:mt-0 w-full lg:w-3/12  underline"
          >
            Skip this step
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssetSettings;
