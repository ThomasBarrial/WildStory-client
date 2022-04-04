import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import defaultAvatar from '../../assets/defaultAvatar.png';

interface IProps {
  item: IConversation;
}

function OneConversation({ item }: IProps): JSX.Element {
  const { user: userStore } = useUserFromStore();

  const friendId = item.members?.find((m) => m.id !== userStore.id);

  const { data, isLoading, error } = useQuery<IUser, AxiosError>(
    ['oneUser', friendId?.id],
    () => user.getOne(friendId?.id)
  );

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (error || !data) {
    return <p className="text-pink animate-pulse pt-10">...Error</p>;
  }
  return (
    <div className="flex  items-center mx-3 lg:mx-0">
      <div
        className="h-10 w-10 rounded-full border border-pink"
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
      <div className="flex flex-col text-left ml-3 w-9/12  justify-between items-start">
        <p className="text-sm">{data?.username}</p>
        <p className="text-xs h-4 text-white text-opacity-50 max-w-xl overflow-hidden">
          {data.profilTitle}
        </p>
      </div>
    </div>
  );
}

export default OneConversation;
