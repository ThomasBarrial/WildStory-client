import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { formation } from '../API/request';
import AvatarUser from '../components/post/AvatarUser';

function Formations(): JSX.Element {
  // TAKE THE FORMATION ID IN THE PARAMS
  const { id } = useParams<{ id: string }>();

  // FETCH THE FORMATION'S DATA TO RENDER HER NAME
  const {
    data: dataFormation,
    isLoading: isFormationLoading,
    error: formationError,
  } = useQuery<IFormation, AxiosError>(['OneForamtion', id], () =>
    formation.getOne(id)
  );

  // FECTH THE USERS WHO ARE OR WAS IN THIS FORMATION
  const {
    data: dataFormationUsers,
    isLoading: isFormationUsersLoading,
    error: formationUsersError,
  } = useQuery<IUserFormation[], AxiosError>(
    ['usersForamtion', dataFormation?.id],
    () => formation.getUsers(dataFormation?.id)
  );

  if (isFormationLoading || isFormationUsersLoading) {
    return <p>Loading</p>;
  }
  if (
    formationError ||
    !dataFormation ||
    formationUsersError ||
    !dataFormationUsers
  ) {
    return <p>Error..</p>;
  }

  return (
    <div className="w-full mt-10 lg:mt-5  pb-20 px-4 lg:p-5 bg-dark rounded-lg">
      Formations
      <h1 className="text-2xl font-bold mt-2">{dataFormation.formationName}</h1>
      {dataFormationUsers.length === 0 && (
        <p className="mt-5 text-pink">
          There is no wilder in this formation for now...
        </p>
      )}
      {dataFormationUsers.map((item) => {
        return (
          <div className="border-b border-pink my-5" key={item.id}>
            <AvatarUser userId={item.id} />
          </div>
        );
      })}
    </div>
  );
}

export default Formations;
