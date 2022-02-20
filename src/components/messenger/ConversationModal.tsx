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
  userConversation: IConversation[] | null;
}

function ConversationModal({
  createConversation,
  setIsModal,
  userConversation,
}: IProps): JSX.Element {
  const [userList, setUserList] = useState<IUser[] | null>([]);
  const [searchValue, setSearchValue] = useState('');
  const { user: userStore } = useUserFromStore();

  // Get users suggestion
  const { data, isLoading, error } = useQuery<IUser[], AxiosError>(
    ['getAllUsers'],
    () => user.getAll(),
    {
      onSuccess: (d: IUser[]) => {
        // SET USERLIST WITH RESPONSE DATA
        setUserList(d);
        // IF THE USER HAVE MIN ONE CONVERSATION
        if (userConversation?.length !== 0) {
          // IN THE DATA ARRAY WE FILTER ALL THE ID EQUAL OF THE TWO MEMBERS ID OF THE CONVERSATION AND PUT IT IN A NEW ARRAY
          const result = d.filter((e) =>
            userConversation?.some(
              (r) => r.user1Id === e.id || r.user2Id === e.id
            )
          );
          // IF USERLIST IS DEFINE
          if (userList) {
            // FOR EACH ELEMENT OF THE NEW ARRAY WE TAKE HIS INDEX IN THE RES ARRAY AND
            result.map((e) => {
              const index = d.indexOf(e);
              // DELETE THE ELEMENT FROM THE USER RESPONSE ARRAY
              return d.splice(index, 1);
            });
            // AFTER THE MAP SET NEW ARRAY IN USERLIST
            setUserList(d);
          }
        }
      },
    }
  );

  // eslint-disable-next-line no-shadow
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
        <div className="mt-5 w-full h-80 overflow-y-scroll">
          {userList?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col w-full bg-black bg-opacity-0 transform  lg:scale-95 hover:bg-opacity-100 hover:scale-100 duration-500"
              >
                <button
                  type="button"
                  onClick={() => handleClick(item.id)}
                  className="flex flex-col w-full"
                >
                  {item.id !== userStore.id && <User item={item} />}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 w-full">
          {userList
            ?.filter(
              (item) =>
                item.username.toLocaleLowerCase() ===
                searchValue.toLocaleLowerCase()
            )
            .map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col w-full bg-black bg-opacity-0 transform lg:scale-95 hover:bg-opacity-100 hover:scale-100 duration-500"
                >
                  <button
                    type="button"
                    onClick={() => handleClick(item.id)}
                    className="mt-6 flex flex-col w-full"
                  >
                    <User item={item} />
                  </button>
                </div>
              );
            })}
          {userList?.filter(
            (item) => item.username.toLowerCase() === searchValue.toLowerCase()
          ).length === 0 && (
            <p className="text-pink text-sm">
              Wilder not found.. try with a other username
            </p>
          )}
        </div>
      )}
      {userList?.length === 0 && (
        <p className="text-pink">
          Congratualtion you talk with every wilders..
        </p>
      )}
    </div>
  );
}

export default ConversationModal;
