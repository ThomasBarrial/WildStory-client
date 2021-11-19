import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { mediaIcons, mediaLinks } from '../../API/request';
import useModal from '../../hook/useModal';
import Modal from '../modal/Modal';
import trash from '../../assets/icons/trash.svg';

interface IProps {
  item: IMediaLink;
  isForm: boolean;
}

function MediaLink({ item, isForm }: IProps): JSX.Element {
  const queryclient = useQueryClient();
  const { isModal, setIsModal, message, setMessage } = useModal();
  const { data, isLoading, isError } = useQuery<IMediaIcon, AxiosError>(
    ['oneIcon', item.iconId],
    () => mediaIcons.getOne(item.iconId as string)
  );

  const { mutate, error } = useMutation(
    () => mediaLinks.delete(item.id as string),
    {
      onSuccess: () => {
        queryclient.refetchQueries(['mediaLinks']);
      },
    }
  );
  if (isError || error) {
    setIsModal(true);
    setMessage(
      'Sorry something bad happen please retry or contact a web admin'
    );
    if (isLoading) {
      return <p>...Loading</p>;
    }
  }
  return (
    <div>
      {isModal && (
        <Modal
          title="Ouups"
          buttons={[{ text: 'ok', handleClick: () => setIsModal(false) }]}
        >
          {message}
        </Modal>
      )}
      <div className="font-lexend my-5 flex justify-between items-center border-b border-pink pb-2">
        <div className="flex items-center">
          <img className="h-6 w-6" src={data?.iconUrl} alt="icon" />
          <p className="ml-2 text-xs">{item.link}</p>
        </div>
        {isForm && (
          <button
            onClick={() => mutate()}
            className="ml-5 flex items-end"
            type="button"
          >
            <img alt="delete" src={trash} />
          </button>
        )}
      </div>
    </div>
  );
}

export default MediaLink;
