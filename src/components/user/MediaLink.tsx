import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { mediaIcons, mediaLinks } from '../../API/request';
import trash from '../../assets/icons/trash.svg';
import ErrorPageToast from '../errors/ErrorToast';

interface IProps {
  item: IMediaLink;
  isForm: boolean;
}

function MediaLink({ item, isForm }: IProps): JSX.Element {
  const queryclient = useQueryClient();
  const { data, isLoading, isError } = useQuery<IMediaIcon, AxiosError>(
    ['oneIcon', item.iconId],
    () => mediaIcons.getOne(item.iconId as string)
  );

  const {
    mutate,
    isError: deleteError,
    isLoading: deleteLoading,
  } = useMutation(() => mediaLinks.delete(item.id as string), {
    onSuccess: () => {
      queryclient.refetchQueries(['mediaLinks']);
    },
  });
  if (isLoading || deleteLoading) {
    return <p className="text-pink animate-pulse pb-10">...Loading</p>;
  }
  if (isError || deleteError || !data) {
    return <ErrorPageToast />;
  }
  return (
    <div>
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
