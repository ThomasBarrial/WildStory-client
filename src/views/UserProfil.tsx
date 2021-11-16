import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { formation, user, userSkills } from '../API/request';
import Header from '../components/user/Header';
import Info from '../components/user/Info';
import Skill from '../components/user/Skill';
import UserPost from '../components/user/UserPost';
import { useUserFromStore } from '../store/user.slice';

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
    () => formation.getOne(userData.idFormation)
  );

  const { data: userSkillsData } = useQuery<IUserSkills[], AxiosError>(
    ['userSkills', userData.id],
    () => userSkills.getAll(userData.id)
  );

  if (formationLoad || userLoad) {
    return <p>Loading</p>;
  }
  if (formationError || !formationData || userError) {
    return <p>Error..</p>;
  }

  return (
    <div className="lg:mx-auto lg:w-7/12 md:w-12/12 mx-auto">
      <Header
        userAvatar={userData.avatarUrl}
        userLanding={userData.landimageUrl}
      />
      <div className="px-4 lg:px-0 h-full transform -translate-y-16">
        <p className="font-bold text-xl lg:text-2xl">{userData.username}</p>
        <p className="text-sm font-thin">{userData.profilTitle}</p>
        <div className="py-8">
          <Info name="Formation">{formationData.formationName}</Info>
          <Info name="City">{userData.city}</Info>
          <Info name="BithDate">{userData.birthDate}</Info>
          <p className="font-bold mt-10 border-b border-pink pb-2">Skills</p>
          {userSkillsData?.map((skill) => {
            return (
              <div key={skill.id}>
                <Skill skill={skill} />
              </div>
            );
          })}
        </div>
      </div>
      <UserPost userId={userData.id} />
    </div>
  );
}

export default UserProfil;
