import React from 'react';
import { useHistory } from 'react-router';
import useModal from '../../../hook/useModal';
import Modal from '../../modal/Modal';

function Dot({ postId }: { postId: string }): JSX.Element {
  const { isModal, setIsModal, message } = useModal();

  const router = useHistory();

  return (
    <div>
      <button
        onClick={() => setIsModal(true)}
        type="button"
        className="h-full mb-3 mr-4 lg:mr-0 text-2xl font-bold"
      >
        ...
      </button>

      {isModal && (
        <Modal
          setIsModal={setIsModal}
          title="Story settings"
          buttons={[
            {
              text: 'Edit post',
              handleClick: () => router.push(`/editpost/${postId}`),
            },
            {
              text: 'delete post',
              handleClick: () => router.push(`/deletepost/${postId}`),
            },
          ]}
        >
          {message}
        </Modal>
      )}
    </div>
  );
}

export default Dot;
