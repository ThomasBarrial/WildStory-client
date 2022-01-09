import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { comment, user } from '../../API/request';
import useModal from '../../hook/useModal';
import { useUserFromStore } from '../../store/user.slice';
import Modal from '../modal/Modal';
import defaultAvatar from '../../assets/defaultAvatar.png';
import ErrorPageToast from '../errors/ErrorToast';

interface IProps {
  item: IComments;
}

function Comment({ item }: IProps): JSX.Element {
  const queryclient = useQueryClient();
  const { isModal, setIsModal, message } = useModal();

  const { user: userFromStore } = useUserFromStore();
  const idUser = userFromStore.id;
  const {
    mutateAsync,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useMutation(() => comment.delete(item.id), {
    onSuccess: () => {
      queryclient.refetchQueries(['getComments']);
      setIsModal(false);
    },
  });

  const {
    data: userData,
    isError,
    isLoading: userLoading,
  } = useQuery<IUser, AxiosError>(['Oneuser', item.userId], () =>
    user.getOne(item.userId)
  );

  if (deleteLoading || userLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (deleteError || !userData || isError) {
    toast(<ErrorPageToast />);
  }
  return (
    <div className="flex my-5 border-b border-pink pb-3">
      {isModal && (
        <Modal
          title="delete your comment"
          buttons={[
            {
              text: 'Yes',
              handleClick: () => {
                mutateAsync();
                setIsModal(false);
              },
            },
            { text: 'No', handleClick: () => setIsModal(false) },
          ]}
        >
          {message}
        </Modal>
      )}
      <div
        className="h-12 w-12 rounded-full border border-pink"
        style={{
          backgroundImage: `url(${
            userData?.avatarUrl === undefined || userData.avatarUrl === null
              ? defaultAvatar
              : userData?.avatarUrl
          })`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div className="ml-4 h-full w-10/12 lg:w-11/12">
        <p className="text-sm">{userData?.username}</p>
        <p className="text-sm font-thin">{item.text}</p>
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
