import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formation } from '../API/request';
import AvatarUser from '../components/post/AvatarUser';
import back from '../assets/icons/back.svg';
import Error404 from '../components/errors/Error404';

function OneFormation(): JSX.Element {
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
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (
    formationError ||
    !dataFormation ||
    formationUsersError ||
    !dataFormationUsers
  ) {
    return <Error404 />;
  }

  return (
    <div className="w-full mt-2 lg:mt-5  pb-20 p-4 lg:p-5 lg:bg-dark rounded-lg">
      <div className="flex lg:flex-row flex-row-reverse justify-between">
        <p>Formations</p>
        <Link className="lg:hidden" to="/formations">
          <img src={back} alt="return" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold mt-5">{dataFormation.formationName}</h1>
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

export default OneFormation;
