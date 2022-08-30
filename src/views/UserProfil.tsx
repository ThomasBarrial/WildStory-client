import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { formation, user } from '../API/request';
import UserAssets from '../components/userProfil/UserAssets';
import UserPost from '../components/userProfil/UserPost';
import { useUserFromStore } from '../store/user.slice';
import Error404 from '../components/errors/Error404';
import Header from '../components/user/Header';
import UserSavedPost from '../components/userProfil/UserSavedPost';
import UserInfo from '../components/userProfil/UserInfo';
import UserCollection from '../components/userProfil/UserCollection';

function UserProfil(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [navItem, setNavItem] = useState('RS');
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

  if (formationLoad || userLoad || !userData || !formationData) {
    return <p className="text-pink animate-pulse p-10">...Loading</p>;
  }
  if (formationError || userError) {
    return <Error404 />;
  }

  return (
    <div className="w-full mb-10">
      <div className="lg:bg-dark rounded-md lg:px-0 lg:pt-0 mt-5 ">
        <UserAssets
          userAvatar={userData?.avatarUrl}
          userLanding={userData?.landimageUrl}
        />
        <div className=" h-full transform -translate-y-24 mt-5 ">
          <Header
            navItem={navItem}
            setNavItem={setNavItem}
            userData={userData}
          />
          {navItem === 'Info' && (
            <UserInfo
              formationName={formationData.formationName}
              city={userData.city}
              birthDate={userData.birthDate}
              id={userData.id}
            />
          )}
          {navItem === 'Collection' && <UserCollection userId={userData.id} />}
          {navItem === 'RS' && <UserPost userId={userData.id} />}
          {navItem === 'SS' && <UserSavedPost userId={userData.id} />}
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
