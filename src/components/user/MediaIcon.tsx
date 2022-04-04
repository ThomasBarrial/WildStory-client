import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { mediaIcons } from '../../API/request';

interface IProps {
  media: IMediaLink;
}

function MediaIcon({ media }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IMediaIcon, AxiosError>(
    ['oneIcon', media.iconId],
    () => mediaIcons.getOne(media.iconId)
  );

  if (isLoading) {
    return <p className="text-pink animate-pulse px-2">..loading</p>;
  }
  if (error) {
    return <p className="text-pink px-2">Error</p>;
  }

  return (
    <div>
      {' '}
      <a href={media.link} target="_blank" rel="noreferrer">
        <img
          className="mr-4 h-6 w-6 mt-5"
          src={data?.iconUrl}
          alt={data?.name}
        />
      </a>
    </div>
  );
}

export default MediaIcon;
