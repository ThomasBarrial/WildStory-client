import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { conversations } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import OneConversation from './OneConversation';
import trash from '../../assets/icons/trash.svg';

interface IProps {
  currentChat: IConversation | null;
  setCurrentChat: Dispatch<SetStateAction<IConversation | null>>;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setUserConversation: Dispatch<SetStateAction<IConversation[] | null>>;
}

function Conversations({
  setCurrentChat,
  currentChat,
  setIsModal,
  setUserConversation,
}: IProps): JSX.Element {
  const { user } = useUserFromStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<IConversation[], AxiosError>(
    ['getUserConversation', user.id],
    () => conversations.getUserConversations(user.id as string),
    {
      onSuccess: (d) => {
        setUserConversation(d);
      },
    }
  );

  const {
    mutateAsync,
    isLoading: isDeleteLoading,
    isError: IsDeleteLoading,
  } = useMutation((id: string) => conversations.delete(id), {
    onSuccess: () => {
      setCurrentChat(null);
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
    <div className="mt-2 w-full lg:mt-0 p-4 h-full inset-0 rounded-md bg-black flex flex-col justify-between">
      <div>
        <h3 className="border-b border-pink pb-2">Conversations</h3>
        <div className=" h-comment overflow-y-scroll overflow-x-hidden">
          {data?.map((item) => {
            return (
              <div
                className={`w-full flex items-center p-2 
              bg-dark bg-opacity-0 my-4 rounded-md hover:bg-opacity-100 transform hover:scale-105 duration-500 ${
                currentChat?.id === item.id &&
                'transform bg-opacity-100 scale-105'
              }`}
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
      <div className="bg-dark p-2 text-sm text-pink rounded-md transform hover:scale-105 duration-500">
        <button type="button" onClick={() => setIsModal(true)}>
          Create new conversation
        </button>
      </div>
    </div>
  );
}

export default Conversations;
