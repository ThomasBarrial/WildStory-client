import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { skills, userSkills } from '../../API/request';
import trash from '../../assets/icons/trash.svg';
import ErrorPageToast from '../errors/ErrorToast';

interface IProps {
  skill: IUserSkills;
  isForm: boolean;
}

function Skill({ skill, isForm }: IProps): JSX.Element {
  const queryclient = useQueryClient();
  const {
    data: skillData,
    error: skillDataError,
    isLoading: SkillDataLoading,
  } = useQuery<ISkills, AxiosError>(['skill', skill.skillId], () =>
    skills.getOne(skill.skillId)
  );

  const { mutate, error, isLoading } = useMutation(
    () => userSkills.delete(skill.id as string),
    {
      onSuccess: () => {
        queryclient.refetchQueries(['userSkills']);
      },
    }
  );
  if (isLoading || SkillDataLoading) {
    return <p className="text-pink animate-pulse pb-10">...Loading</p>;
  }
  if (skillDataError) {
    return <ErrorPageToast />;
  }
  return (
    <div className="flex text-sm justify-between border-b border-opacity-40 my-5 pb-2 border-pink">
      <p>{skillData?.name}</p>
      <div className="flex">
        <p>{skill.note}/10</p>
        {isForm && (
          <button
            onClick={() => mutate()}
            className="ml-5 flex items-end"
            type="button"
          >
            {error ? (
              <p className="text-sm text-pink ">
                Error something went wrong...
              </p>
            ) : (
              <img alt="delete" src={trash} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Skill;
