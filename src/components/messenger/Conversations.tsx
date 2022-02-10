import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { conversations } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import OneConversation from './OneConversation';
import trash from '../../assets/icons/trash.svg';

interface IProps {
  setCurrentChat: Dispatch<SetStateAction<IConversation | null>>;
}

function Conversations({ setCurrentChat }: IProps): JSX.Element {
  const { user } = useUserFromStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<IConversation[], AxiosError>(
    ['getUserConversation', user.id],
    () => conversations.getUserConversations(user.id as string)
  );

  const {
    mutateAsync,
    isLoading: isDeleteLoading,
    isError: IsDeleteLoading,
  } = useMutation((id: string) => conversations.delete(id), {
    onSuccess: () => {
      queryClient.refetchQueries(['getUserConversation']);
    },
  });

  if (isLoading || isDeleteLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }

  if (isError || IsDeleteLoading) {
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
            <div
              className="w-full border-b border-pink border-opacity-50 my-3"
              key={item.id}
            >
              <button
                className="w-11/12"
                type="button"
                onClick={() => setCurrentChat(item)}
              >
                <OneConversation item={item} />
              </button>
              <button
                className="w-1/12"
                onClick={() => mutateAsync(item.id as string)}
                type="button"
              >
                <img src={trash} alt="delete" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Conversations;
