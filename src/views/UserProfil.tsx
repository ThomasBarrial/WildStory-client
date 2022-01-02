import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formation, mediaLinks, user, userSkills } from '../API/request';
import Header from '../components/user/Header';
import Info from '../components/user/Info';
import MediaIcon from '../components/user/MediaIcon';
import Skill from '../components/user/Skill';
import UserPost from '../components/user/UserPost';
import { useUserFromStore } from '../store/user.slice';
import edit from '../assets/icons/edit.svg';

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

  const { data: userSkillsData } = useQuery<IUserSkills[], AxiosError>(
    ['userSkills', userData.id],
    () => userSkills.getAll(userData.id as string)
  );

  const { data: userMediaLinksData } = useQuery<IMediaLink[], AxiosError>(
    ['userMediaLinks', userData.id],
    () => mediaLinks.getUsersMediaLink(userData.id as string)
  );

  if (formationLoad || userLoad) {
    return <p>Loading</p>;
  }
  if (formationError || !formationData || userError) {
    return <p>Error..</p>;
  }

  return (
    <div className="w-full">
      <Header
        userAvatar={userData?.avatarUrl}
        userLanding={userData?.landimageUrl}
      />
      <div className="px-4 lg:px-0 h-full transform -translate-y-16 ">
        <div className="lg:mx-4 border-b border-pink ">
          <p className="font-bold mt-2 text-xl lg:text-2xl">
            {userData.username}
          </p>
          <div className="w-full flex justify-between">
            <p className="text-sm mb-2 lg:mb-2 font-thin">
              {userData.profilTitle}
            </p>
            <p className="text-sm">Contact: {userData.email}</p>
          </div>
        </div>
        <div className="pb-8 lg:bg-dark rounded-md lg:px-5 lg:pt-2 mt-5 ">
          <div className="w-full mt-2">
            {id === userStore.id && (
              <Link to={`/settings/${userData.id}`}>
                <p className="text-sm w-full transform translate-y-2 justify-end flex text-right underline">
                  <img className="mr-2" src={edit} alt="" />
                  Edit your profil
                </p>
              </Link>
            )}
            <Info name="Formation">{formationData.formationName}</Info>
          </div>
          <Info name="City">{userData.city}</Info>
          <Info name="BithDate">{userData.birthDate}</Info>
          {userSkillsData?.length !== 0 && (
            <div className="mt-10 border-b border-pink pb-2 flex items-center justify-between">
              <p className="font-bold text-xl">Skills</p>
              {id === userStore.id && (
                <Link to={`/edituserskills/${userData.id}`}>
                  <p className=" text-sm underline">Edit your skills</p>
                </Link>
              )}
            </div>
          )}
          {userSkillsData?.length === 0 && userStore.id === id && (
            <p className="text-pink font-thin my-2 w-full flex items-center">
              There is no skill for now{' '}
              <Link to={`/edituserskills/${userData.id}`}>
                <p className="ml-2 text-sm underline">Edit your skills</p>
              </Link>
            </p>
          )}

          {userSkillsData?.map((skill) => {
            return (
              <div key={skill.id}>
                <Skill isForm={false} skill={skill} />
              </div>
            );
          })}

          <div className="w-full flex items-end justify-between">
            <div className="flex">
              {userMediaLinksData?.map((media) => {
                return (
                  <div key={media.id}>
                    <MediaIcon media={media} />
                  </div>
                );
              })}
            </div>
            {userStore.id === id && userMediaLinksData?.length !== 0 && (
              <Link to={`/editsocialmedia/${userStore.id}`}>
                <p className="underline mt-3 lg:mt-5 text-sm">
                  Edit your links
                </p>
              </Link>
            )}
            {userMediaLinksData?.length === 0 && userStore.id === id && (
              <p className="text-pink font-thin my-2 w-full flex items-center">
                There is no social media links for now{' '}
                <Link to={`/editsocialmedia/${userData.id}`}>
                  <p className="ml-2 text-sm underline">Edit your links</p>
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      <UserPost userId={userData.id} />
    </div>
  );
}

export default UserProfil;
