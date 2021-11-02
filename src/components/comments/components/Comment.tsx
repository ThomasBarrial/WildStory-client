import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { comment, user } from '../../../API/request';
import useModal from '../../../hook/useModal';
import { useUserFromStore } from '../../../store/user.slice';
import Modal from '../../modal/Modal';

interface IProps {
  item: IComments;
}

function Comment({ item }: IProps): JSX.Element {
  const queryclient = useQueryClient();
  const { isModal, setIsModal, message } = useModal();
  const { mutate } = useMutation(() => comment.delete(item.id), {
    onSuccess: () => {
      queryclient.refetchQueries(['getComments']);
      setIsModal(false);
    },
  });

  const { data: userData, error } = useQuery<IUser, AxiosError>(
    ['Oneuser', item.userId],
    () => user.getOne(item.userId)
  );

  const { user: userFromStore } = useUserFromStore();

  const idUser = userFromStore.id;
  return (
    <div className="flex my-5 border-b border-pink pb-3">
      {isModal && (
        <Modal
          title={
            !error
              ? 'Do you want to delete your comment ?'
              : 'Something goes wrong :('
          }
          buttons={
            !error
              ? [
                  { text: 'Yes', handleClick: () => mutate() },
                  { text: 'No', handleClick: () => setIsModal(false) },
                ]
              : [{ text: 'ok', handleClick: () => setIsModal(false) }]
          }
        >
          {message}
        </Modal>
      )}
      <div
        className="h-12 w-12 rounded-full border border-white"
        style={{
          backgroundImage: `url(${userData?.avatarUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div className="ml-4 w-11/12">
        <p className="text-sm">{userData?.username}</p>
        <p className="text-sm font-thin mt-1">{item.text}</p>
        {item.userId === idUser && (
          <button
            className="text-xl h-3 flex items-end w-full justify-end"
            onClick={() => setIsModal(true)}
            type="button"
          >
            ...
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
