import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { user } from '../../API/request';
import defaultAvatar from '../../assets/defaultAvatar.png';
import ErrorPage from '../../views/ErrorPage';
import Loader from '../loader/Loader';

interface IProps {
  userId: string | undefined;
}

function AvatarUser({ userId }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IUser, AxiosError>(
    ['skill', userId],
    () => user.getOne(userId)
  );

  if (isLoading) {
    return <Loader />;
  }
  if (error || !data) {
    return <ErrorPage />;
  }
  return (
    <Link to={`/profil/${data.id}`}>
      <div className="flex items-center mx-3 lg:mx-0 pb-3">
        <div
          className="h-12 w-12 rounded-full border border-pink"
          style={{
            backgroundImage: `url(${
              data.avatarUrl === null || data.avatarUrl === undefined
                ? defaultAvatar
                : data.avatarUrl
            })`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex ml-3 flex-col items-start">
          <p className="">{data.username}</p>
          <p className="text-xs font-thin">{data.profilTitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default AvatarUser;
