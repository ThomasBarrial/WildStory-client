import { AxiosError } from 'axios';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseMutateAsyncFunction, useQuery } from 'react-query';
import { BaseEmoji, Picker } from 'emoji-mart';
import { useForm } from 'react-hook-form';
import { messages } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import AvatarUser from '../post/AvatarUser';
import Message from './Message';
import sendIcon from '../../assets/icons/sendMessage.svg';
import 'emoji-mart/css/emoji-mart.css';
import emoji from '../../assets/icons/emoji.svg';
import back from '../../assets/icons/back.svg';

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
  setCurrentChat: Dispatch<SetStateAction<IConversation | null>>;
  writing: string;
}

function Chat({
  writing,
  currentChat,
  setNewMessage,
  sendMessage,
  newMessage,
  setCurrentChat,
}: IProps): JSX.Element {
  const { user: userStore } = useUserFromStore();
  const { handleSubmit } = useForm();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
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

  const onSubmit = () => {
    const message = {
      conversationId: currentChat.id as string,
      senderId: userStore.id as string,
      text: newMessage,
    };

    setNewMessage('');
    return sendMessage({ message });
  };

  const handleUserKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // e.preventDefault();
      handleSubmit(onSubmit)(); // this won't be triggered
    }
  };

  const addEmoji = (e: BaseEmoji) => {
    const emojiText = e.native;
    setNewMessage(newMessage + emojiText);
  };

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (isError || !data) {
    return <p className="text-pink animate-pulse pt-10">...Error</p>;
  }

  return (
    <div className="lg:w-full lg:flex lg:flex-col pb-2 justify-between lg:mr-4 w-11/12 mt-2 mx-auto h-full">
      {show && (
        <Picker
          onSelect={addEmoji}
          theme="dark"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            maxWidth: '300px',
            width: '100%',
            outline: 'none',
            zIndex: 10,
          }}
          i18n={{
            search: 'Search',
            notfound: 'No Emoji Found',
            categories: {
              search: 'Search Results',
              recent: 'Frequently Used',
              people: 'People & Body',
              nature: 'Animals & Nature',
              foods: 'Food & Drink',
              activity: 'Activity',
              places: 'Travel & Places',
              objects: 'Objects',
              symbols: 'Symbols',
              flags: 'Flags',
              custom: 'Custom',
            },
          }}
        />
      )}
      <div className="border-b border-pink w-full flex  items-center">
        <button
          onClick={() => setCurrentChat(null)}
          type="button"
          className="h-full lg:hidden pb-3"
        >
          <img src={back} alt="Back" />
        </button>
        <AvatarUser userId={friendId?.id} />
      </div>

      <div
        ref={scrollRef}
        className="h-newmessage lg:h-message overflow-y-scroll "
      >
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
      {writing !== '' && (
        <p className="text-white mt-3 text-sm animate-pulse text-opacity-75">
          {writing} is writing....
        </p>
      )}
      <form
        className="h-16 lg:h-20 text-sm flex mt-2 border-pink border rounded-md max-h-52"
        action="sendMessage"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          placeholder="Write your message..."
          onKeyPress={(e) => handleUserKeyPress(e)}
          onChange={(e) => {
            if (e.target.value !== '') {
              setNewMessage(e.target.value);
            }
          }}
          value={newMessage}
          className="w-full min-h-full lg:h-newmessage bg-transparent p-3 focus:outline-none"
        />
        <input type="submit" className="hidden" />
        <button
          className="hidden lg:flex h-full lg:items-center transform hover:scale-105 duration-500"
          onClick={() => setShow((prev) => !prev)}
          type="button"
        >
          <img src={emoji} alt="emoji" className="h-7 w-7" />
        </button>
        <button
          className="text-pink flex items-center px-4 py-2 text-md rounded-sm transform hover:scale-105  duration-500"
          type="submit"
        >
          <img className="h-6 transform -rotate-90" src={sendIcon} alt="Send" />
        </button>
      </form>
    </div>
  );
}

export default Chat;
