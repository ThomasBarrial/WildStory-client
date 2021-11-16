import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { user } from '../../API/request';

interface IProps {
  userId: string | undefined;
}

function AvatarUser({ userId }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IUser, AxiosError>(
    ['skill', userId],
    () => user.getOne(userId)
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  return (
    <Link to={`/profil/${data.id}`}>
      <div className="flex items-center mx-3 lg:mx-0 py-3">
        <div
          className="h-12 w-12 rounded-full border border-white"
          style={{
            backgroundImage: `url(${data.avatarUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <p className="ml-4 text-sm">{data.username}</p>
      </div>
    </Link>
  );
}

export default AvatarUser;
