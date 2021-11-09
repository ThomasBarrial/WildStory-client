import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../../API/request';

interface IProps {
  userId: string;
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
    <div className="flex items-center mx-3 py-3">
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
  );
}

export default AvatarUser;
