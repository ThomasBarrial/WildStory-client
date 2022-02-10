import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { UseMutateAsyncFunction, useQuery } from 'react-query';
import { user } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import User from './User';

interface IProps {
  createConversation: UseMutateAsyncFunction<
    IConversation,
    unknown,
    {
      conversationData: IConversation;
    },
    unknown
  >;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function ConversationModal({
  createConversation,
  setIsModal,
}: IProps): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const { user: userStore } = useUserFromStore();
  const { data, isLoading, error } = useQuery<IUser[], AxiosError>(
    ['getAllUsers'],
    () => user.getAll()
  );

  const handleClick = (id: string) => {
    setIsModal(false);
    const conversationData = {
      receiverId: id,
      senderId: userStore.id as string,
    };

    return createConversation({ conversationData });
  };

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  return (
    <div>
      <input
        type="text"
        placeholder="search for a wilder..."
        className="bg-black w-full mt-5 border rounded-md focus:outline-none p-2 px-3 border-white"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue === '' ? (
        <div className="mt-10  h-80 overflow-y-scroll">
          {data.map((item) => {
            return (
              <button
                type="button"
                key={item.id}
                className="border-b border-pink my-4 flex flex-col w-full"
                onClick={() => handleClick(item.id)}
              >
                <User item={item} />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-10">
          {data
            .filter(
              (item) =>
                item.username.toLocaleLowerCase() ===
                searchValue.toLocaleLowerCase()
            )
            .map((item) => {
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="border-b border-pink my-4 flex flex-col w-full"
                >
                  <User item={item} />
                </button>
              );
            })}
          {data.filter(
            (item) => item.username.toLowerCase() === searchValue.toLowerCase()
          ).length === 0 && (
            <p className="text-pink text-sm">
              Wilder not found.. try with a other username
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ConversationModal;
