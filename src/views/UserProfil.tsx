import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formation, user } from '../API/request';
import Header from '../components/user/Header';
import Info from '../components/user/Info';
import UserPost from '../components/user/UserPost';
import { useUserFromStore } from '../store/user.slice';
import edit from '../assets/icons/edit.svg';
import ErrorPageToast from '../components/errors/ErrorToast';
import UserSkillDisplay from '../components/userProfil/UserSkillDisplay';
import UserMediaLinksDisplay from '../components/userProfil/UserMediaLinksDisplay';

function UserProfil(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { user: userStore } = useUserFromStore();
  const [userData, setUserData] = useState(userStore);

  const { isLoading: userLoad, error: userError } = useQuery<IUser, AxiosError>(
    ['oneUser', id],
    () => user.getOne(id),
    {
      enabled: Boolean(id),
      onSuccess: (data) => {
        setUserData(data);
      },
    }
  );

  const {
    data: formationData,
    isLoading: formationLoad,
    error: formationError,
  } = useQuery<IFormation, AxiosError>(
    ['formation', userData.idFormation],
    () => formation.getOne(userData.idFormation as string)
  );

  if (formationLoad || userLoad) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (formationError || !formationData || userError) {
    return (
      <div className="pt-10">
        <ErrorPageToast />
      </div>
    );
  }

  return (
    <div className="w-full" id="e">
      <div className="lg:bg-dark rounded-md lg:px-0 lg:pt-0 mt-5 ">
        <Header
          userAvatar={userData?.avatarUrl}
          userLanding={userData?.landimageUrl}
        />
        <div className="px-4 lg:px-7 h-full transform -translate-y-16 ">
          <div className="border-b border-pink">
            <p className="font-bold mt-2 text-2xl lg:text-2xl">
              {userData.username}
            </p>
            <div className="w-full flex justify-between">
              <p className="text-md mb-2 lg:mb-2 font-thin">
                {userData.profilTitle}
              </p>
              {id === userStore.id && (
                <Link to={`/settings/${userData.id}`}>
                  <p className="text-sm w-full  justify-end flex text-right underline">
                    <img className="mr-2" src={edit} alt="" />
                    Edit your profil
                  </p>
                </Link>
              )}
            </div>
          </div>
          <div className="w-full mt-8 lg:mt-10">
            <Info name="Formation">{formationData.formationName}</Info>
          </div>
          <Info name="City">{userData.city}</Info>
          <Info name="BithDate">{userData.birthDate}</Info>
          <UserSkillDisplay userId={userData.id} />
          <UserMediaLinksDisplay userId={userData.id} />
        </div>
      </div>
      <UserPost userId={userData.id} />
    </div>
  );
}

export default UserProfil;
