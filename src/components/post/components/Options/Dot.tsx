import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { post } from '../../../../API/request';
import useModal from '../../../../hook/useModal';
import Modal from '../../../modal/Modal';

function Dot({ postId }: { postId: string }): JSX.Element {
  const { isModal, setIsModal, message } = useModal();
  const [isConfirmationMessage, setIsConfirmationMessage] = useState(false);
  const router = useHistory();
  const queryclient = useQueryClient();
  const { mutateAsync, error } = useMutation(() => post.delete(postId), {
    onSuccess: () => {
      queryclient.refetchQueries(['posts']);
    },
  });

  if (error) {
    return <p>Sorry something bad happen try later</p>;
  }

  return (
    <div>
      <button
        onClick={() => setIsModal(true)}
        type="button"
        className="h-full mb-3 text-2xl font-bold"
      >
        ...
      </button>

      {isModal && (
        <Modal
          title={
            isConfirmationMessage
              ? 'do you really want to delete this story'
              : 'Every things geos well'
          }
          buttons={
            isConfirmationMessage
              ? [
                  {
                    text: 'Yes',
                    handleClick: () => {
                      mutateAsync();
                      setIsModal(false);
                    },
                  },
                  {
                    text: 'No',
                    handleClick: () => setIsConfirmationMessage(false),
                  },
                ]
              : [
                  {
                    text: 'Edit Story',
                    handleClick: () => router.push(`/editpost/${postId}`),
                  },
                  {
                    text: 'delete Story',
                    handleClick: () => setIsConfirmationMessage(true),
                  },
                ]
          }
        >
          {message}
        </Modal>
      )}
    </div>
  );
}

export default Dot;
