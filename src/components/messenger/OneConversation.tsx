import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import defaultAvatar from '../../assets/defaultAvatar.png';

interface IProps {
  conversation: IConversation;
}

function OneConversation({ conversation }: IProps): JSX.Element {
  const { user: userStore } = useUserFromStore();

  const friendId = conversation.members.find((m) => m.id !== userStore.id);

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
    <div className="my-3 border-b border-pink border-opacity-50">
      <div className="flex items-center mx-3 lg:mx-0 pb-2">
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
        <div className="flex ml-3 w-6/12 flex-col items-start">
          <p className="text-sm">{data?.username}</p>
        </div>
      </div>
    </div>
  );
}

export default OneConversation;
