import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { skills } from '../../../API/request';

function Skill({ skill }: { skill: IUserSkills }): JSX.Element {
  const { data: skillData } = useQuery<ISkills, AxiosError>(
    ['skill', skill.skillId],
    () => skills.getOne(skill.skillId)
  );

  return (
    <div className="flex text-sm justify-between border-b my-5 pb-2 border-pink">
      <p>{skillData?.name}</p>
      <p>{skill.note}/10</p>
    </div>
  );
}

export default Skill;
