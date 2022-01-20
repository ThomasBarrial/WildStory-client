import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { BaseEmoji, Picker } from 'emoji-mart';
import { comment } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import ErrorPageToast from '../errors/ErrorToast';
import 'emoji-mart/css/emoji-mart.css';
import emoji from '../../assets/icons/emoji.svg';

interface IProps {
  idPost: string | undefined;
}

export default function NewComment({ idPost }: IProps): JSX.Element {
  const { handleSubmit } = useForm();
  const queryclient = useQueryClient();
  const [isEmptyText, setIsEmptyText] = useState(false);
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const { user } = useUserFromStore();

  const {
    mutate: postComment,
    isLoading,
    isError,
  } = useMutation(comment.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['getComments']);
    },
  });

  const onSubmit = () => {
    let postId = '';
    if (idPost !== undefined) {
      postId = idPost;
    }

    const commentData = {
      text,
      // UserId come from Redux Store
      userId: user.id,
      postId,
    };
    if (text === '') return setIsEmptyText(true);
    return postComment({ commentData });
  };

  const addEmoji = (e: BaseEmoji) => {
    const emojiText = e.native;
    setText(text + emojiText);
  };

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (isError) {
    toast(<ErrorPageToast />);
  }
  return (
    <div className=" lg:pb-3 w-full">
      <div className="w-full">
        {show && (
          <Picker
            onSelect={addEmoji}
            theme="dark"
            style={{
              position: 'fixed',
              bottom: '20px',

              right: '250px',
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
        <form onSubmit={handleSubmit(onSubmit)} action="postComment">
          <div className="flex inset-0">
            <textarea
              className="bg-black rounded-sm font-thin text-base text-white border border-pink w-full focus:outline-none h-14 lg:h-16  px-3 py-3"
              id="text"
              value={text}
              // eslint-disable-next-line react/jsx-props-no-spreading

              onChange={(e) => setText(e.target.value)}
            />
            <div className="absolute w-5/12 flex items-end justify-end mt-5 ml-10">
              <button onClick={() => setShow(true)} type="button">
                <img src={emoji} alt="emoji" className="h-7 w-7" />
              </button>
            </div>
          </div>

          {isEmptyText && (
            <p className="text-sm text-pink mt-2">Please write something</p>
          )}
          <button
            className="text-lg rounded-sm my-5 border text-pink border-pink w-6/12 py-1"
            type="submit"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
