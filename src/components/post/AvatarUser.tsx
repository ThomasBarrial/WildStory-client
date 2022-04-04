import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { user } from '../../API/request';
import defaultAvatar from '../../assets/defaultAvatar.png';
import ErrorPageToast from '../errors/ErrorToast';

interface IProps {
  userId: string | undefined;
}

function AvatarUser({ userId }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IUser, AxiosError>(
    ['oneUser', userId],
    () => user.getOne(userId)
  );

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (error || !data) {
    toast(<ErrorPageToast />);
  }
  return (
    <Link to={`/profil/${data?.id}`}>
      <div className="flex items-center mx-3 lg:mx-0 pb-3">
        <div
          className="h-12 w-12 rounded-full border border-pink"
          style={{
            backgroundImage: `url(${
              data?.avatarUrl === null || data?.avatarUrl === undefined
                ? defaultAvatar
                : data?.avatarUrl
            })`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex ml-3 w-5/12 flex-col items-start">
          <p className="">{data?.username}</p>
        </div>
      </div>
    </Link>
  );
}

export default AvatarUser;
