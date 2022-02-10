import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { UseMutateAsyncFunction, useQuery } from 'react-query';

import { messages } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import AvatarUser from '../post/AvatarUser';
import Message from './Message';

interface IProps {
  currentChat: IConversation;
  setNewMessage: Dispatch<SetStateAction<string>>;
  sendMessage: UseMutateAsyncFunction<
    IMessage,
    unknown,
    {
      message: IMessage;
    },
    unknown
  >;
  newMessage: string;
}

function Chat({
  currentChat,
  setNewMessage,
  sendMessage,
  newMessage,
}: IProps): JSX.Element {
  const { user: userStore } = useUserFromStore();

  //   const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const friendId = currentChat.members?.find((m) => m.id !== userStore.id);

  const { data, isLoading, isError } = useQuery<IMessage[], AxiosError>(
    ['getConversationMessages', currentChat.id],
    () => messages.getConversationMessages(currentChat.id as string)
  );

  useEffect(() => {
    const domNode = scrollRef.current;

    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const message = {
      conversationId: currentChat.id as string,
      senderId: userStore.id as string,
      text: newMessage,
    };

    return sendMessage({ message });
  };

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (isError || !data) {
    return <p className="text-pink animate-pulse pt-10">...Error</p>;
  }
  return (
    <div className="lg:w-full lg:mr-4 w-11/12 mt-2 mx-auto h-full">
      <div className="border-b border-pink w-full">
        <AvatarUser userId={friendId?.id} />
      </div>

      <div ref={scrollRef} className="h-80 lg:h-message overflow-y-scroll ">
        <div className=" flex flex-col z-50 justify-end mt-5">
          {data.map((item) => {
            return (
              <div
                className={`p-1 flex ${
                  item.senderId === userStore.id
                    ? 'justify-end'
                    : 'justify-start'
                } `}
                key={item.id}
              >
                <Message item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-1/6 mt-5 border-pink border rounded-md">
        <textarea
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full h-16 lg:h-newmessage bg-transparent p-3 focus:outline-none"
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className="text-pink ml-3 mb-3 px-4 py-1 text-xs  border border-pink rounded-sm"
          type="button"
        >
          send Message
        </button>
      </div>
    </div>
  );
}

export default Chat;
