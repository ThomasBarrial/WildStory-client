import React from 'react';

interface IProps {
  formationName: string;
  city: string;
  birthDate: string;
}

function Info({ formationName, city, birthDate }: IProps): JSX.Element {
  return (
    <div>
      <div className="mb-5 border-b border-pink pb-2">
        <p className="font-bold">Formation</p>
        <p>{formationName}</p>
      </div>
      <div className="my-5 border-b border-pink pb-2">
        <p className="font-bold">City</p>
        <p>{city}</p>
      </div>
      <div className="my-5 border-b border-pink pb-2">
        <p className="font-bold">BirthDate</p>
        <p>{birthDate}</p>
      </div>
    </div>
  );
}

export default Info;
