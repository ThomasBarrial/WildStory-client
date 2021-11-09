import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { formation, userSkills } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import Header from './components/Header';
import Info from './components/Info';
import Skill from './components/Skill';
import UserPost from './components/UserPost';

function UserProfil(): JSX.Element {
  const { user } = useUserFromStore();
  const {
    data: formationData,
    isLoading,
    error,
  } = useQuery<IFormation, AxiosError>(['formation', user.idFormation], () =>
    formation.getOne(user.idFormation)
  );

  const { data: userSkillsData } = useQuery<IUserSkills[], AxiosError>(
    ['userSkills', user.id],
    () => userSkills.getAll(user.id)
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !formationData) {
    return <p>Error..</p>;
  }
  return (
    <div className="lg:mx-auto lg:w-8/12">
      <Header userAvatar={user.avatarUrl} userLanding={user.landimageUrl} />
      <div className="px-4 h-full transform -translate-y-16">
        <p className="font-bold text-xl">{user.username}</p>
        <p className="text-sm">{user.profilTitle}</p>
        <div className="py-8">
          <Info
            formationName={formationData?.formationName}
            city={user.city}
            birthDate={user.birthDate}
          />
          <p className="font-bold mt-10 border-b border-pink pb-2">Skills</p>
          {userSkillsData?.map((skill) => {
            return <Skill skill={skill} />;
          })}
        </div>
      </div>
      <UserPost userId={user.id} />
    </div>
  );
}

export default UserProfil;
