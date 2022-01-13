import React from 'react';
import UserMediaLinksDisplay from './UserMediaLinksDisplay';
import UserSkillDisplay from './UserSkillDisplay';
import Info from '../user/Info';

interface IProps {
  formationName: string;
  city: string | undefined;
  birthDate: string | undefined;
  id: string | undefined;
}

function UserInfo({ formationName, city, birthDate, id }: IProps): JSX.Element {
  return (
    <div>
      <div className="w-full mt-8 lg:mt-10 px-4 lg:px-7">
        <Info name="Formation">{formationName}</Info>
        <Info name="City">{city}</Info>
        <Info name="BithDate">{birthDate}</Info>
      </div>
      <UserSkillDisplay userId={id} />
      <UserMediaLinksDisplay userId={id} />
    </div>
  );
}

export default UserInfo;
