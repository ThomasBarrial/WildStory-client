import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { userSkills } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import Skill from '../user/Skill';
import Error404 from '../errors/Error404';

interface IProps {
  userId: string | undefined;
}

function UserSkillDisplay({ userId }: IProps): JSX.Element {
  const { user: userStore } = useUserFromStore();
  const { id } = useParams<{ id: string }>();

  const {
    data: userSkillsData,
    isLoading: userSkillLoading,
    error: userSkillError,
  } = useQuery<IUserSkills[], AxiosError>(['userSkills', userId], () =>
    userSkills.getAll(userId as string)
  );

  if (userSkillLoading) {
    return <p className="text-pink animate-pulse p-5">...Loading</p>;
  }
  if (userSkillError) {
    return <Error404 />;
  }

  return (
    <div className="px-4 lg:px-7">
      {' '}
      {userSkillsData?.length !== 0 && (
        <div className="mt-10 border-b border-pink pb-2 flex items-center justify-between">
          <p className="font-bold text-xl">Skills</p>
          {id === userStore.id && (
            <Link to={`/edituserskills/${userId}`}>
              <p className=" text-sm underline">Edit your skills</p>
            </Link>
          )}
        </div>
      )}
      {userSkillsData?.length === 0 && userStore.id === id && (
        <p className="text-pink font-thin my-2 w-full flex items-center">
          There is no skill for now{' '}
          <Link to={`/edituserskills/${userId}`}>
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
    </div>
  );
}

export default UserSkillDisplay;
