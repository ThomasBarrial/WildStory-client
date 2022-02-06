import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { conversations } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import OneConversation from './OneConversation';

interface IProps {
  setCurrentChat: Dispatch<SetStateAction<IConversation | null>>;
}

function Conversations({ setCurrentChat }: IProps): JSX.Element {
  const { user } = useUserFromStore();

  const { data, isLoading, isError } = useQuery<IConversation[], AxiosError>(
    ['getUserConversation', user.id],
    () => conversations.getUserConversations(user.id as string)
  );

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }

  if (isError) {
    return (
      <p className="text-pink animate-pulse pt-10">
        Ooops something went wrong...
      </p>
    );
  }

  return (
    <div className="mt-2 w-full lg:mt-0 p-4 h-full rounded-md bg-black">
      <h3 className="border-b border-pink pb-2">Conversations</h3>
      <div className="mt-2">
        {data?.map((item) => {
          return (
            <button
              className="w-full"
              type="button"
              onClick={() => setCurrentChat(item)}
              key={item.id}
            >
              <OneConversation conversation={item} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Conversations;
