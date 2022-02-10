import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'timeago.js';
import { user } from '../../API/request';
import defaultAvatar from '../../assets/defaultAvatar.png';

interface IProps {
  item: IMessage;
}

function Message({ item }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IUser, AxiosError>(
    ['oneUser', item.senderId],
    () => user.getOne(item.senderId)
  );

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (error || !data) {
    return <p className="text-pink animate-pulse pt-10">...Error</p>;
  }
  return (
    <div className="lg:w-5/12 w-8/12 p-2 flex">
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
      <div className="ml-2 w-10/12">
        <p className="text-xs">{data.username}</p>
        <p className="text-sm border border-pink border-opacity-40 bg-black  rounded-xl p-4 mt-1">
          {item.text}
        </p>
        <p className="text-xs font-thin mt-1">
          {format(item.createdAt as string)}
        </p>
      </div>
    </div>
  );
}

export default Message;
