/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { conversations, messages } from '../API/request';
import Chat from '../components/messenger/Chat';
import ConversationModal from '../components/messenger/ConversationModal';
import Conversations from '../components/messenger/Conversations';
import PlaceHolder from '../components/messenger/PlaceHolder';
import Modal from '../components/modal/Modal';
import useModal from '../hook/useModal';
import { useUserFromStore } from '../store/user.slice';

const socket = io(import.meta.env.VITE_SOCKET_URL as string);

function Messenger(): JSX.Element {
  const { user } = useUserFromStore();
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const [userConversation, setUserConversation] = useState<
    IConversation[] | null
  >([]);
  const [newMessage, setNewMessage] = useState('');
  useState<IConversation | null>();
  const queryClient = useQueryClient();
  const { isModal, setIsModal } = useModal();

  const {
    mutateAsync: updateConversation,
    isLoading: updateConversationLoading,
    isError: updateConversationError,
  } = useMutation(conversations.update, {
    onSuccess: () => {
      queryClient.refetchQueries(['getUserConversation']);
    },
  });

  useEffect(() => {
    socket.emit('addUser', user.id).removeListener();
    socket.on('getMessage', (data: IMessage) => {
      setArrivalMessage({
        conversationId: data.conversationId,
        senderId: data.senderId,
        text: data.text,
      });
      const body = { isNewMessage: data.senderId };
      updateConversation({ id: data.conversationId, body });
    });
    socket.on('getConversation', () => {
      queryClient.refetchQueries(['getUserConversation']);
    });
  }, [user]);

  useEffect(() => {
    const currentMembers: string[] = [];
    currentChat?.members?.map((item) => {
      return currentMembers.push(item.id);
    });

    if (
      arrivalMessage !== null &&
      currentMembers.includes(arrivalMessage?.senderId as string)
    ) {
      queryClient.refetchQueries(['getConversationMessages']);
    }
  }, [arrivalMessage, currentChat]);

  const receiverId = currentChat?.members?.find(
    (member) => member.id !== user.id
  );

  const {
    mutateAsync: createConversation,
    isLoading: createConversationLoading,
    isError: createConversationError,
  } = useMutation(conversations.post, {
    onSuccess: (d) => {
      const receiver = d.members?.filter((item) => item.id !== user.id)[0];
      socket.emit('createConversation', {
        receiverId: receiver?.id,
      });
      setCurrentChat(d);
    },
  });

  const {
    mutateAsync: sendMessage,
    isLoading: sendMessageLoading,
    isError: sendMessageError,
  } = useMutation(messages.post, {
    onSuccess: () => {
      socket.emit('sendMessage', {
        conversationId: currentChat?.id,
        receiverId: receiverId?.id,
        text: newMessage,
        senderId: user.id,
      });
    },
  });

  if (
    sendMessageLoading ||
    createConversationLoading ||
    updateConversationLoading
  ) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (sendMessageError || updateConversationError) {
    return <p className="text-pink animate-pulse pt-10">...Error</p>;
  }

  if (createConversationError) {
    toast('This conversation already exist');
  }

  return (
    <div className="mt-5">
      {isModal && (
        <Modal setIsModal={setIsModal} title="Users suggestions" buttons={[]}>
          <ConversationModal
            userConversation={userConversation}
            setIsModal={setIsModal}
            createConversation={createConversation}
          />
        </Modal>
      )}
      <div className="lg:p-4 lg:bg-dark rounded-md mb-10 h-messenger flex">
        {currentChat ? (
          <div
            className={`lg:w-9/12  w-full ${
              currentChat ? 'lg:flex' : 'hidden'
            }`}
          >
            <Chat
              setCurrentChat={setCurrentChat}
              newMessage={newMessage}
              sendMessage={sendMessage}
              setNewMessage={setNewMessage}
              currentChat={currentChat}
            />
          </div>
        ) : (
          <div className="lg:w-9/12 hidden lg:flex">
            <PlaceHolder setIsModal={setIsModal} />
          </div>
        )}
        <div className={`lg:w-3/12 w-full ${currentChat && 'hidden lg:flex'}`}>
          <Conversations
            updateConversation={updateConversation}
            setUserConversation={setUserConversation}
            setIsModal={setIsModal}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
