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
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error..</p>;
  }

  return (
    <div>
      {' '}
      <a href={media.link} target="_blank" rel="noreferrer">
        <img
          className="mr-4 h-8 w-8 mt-5"
          src={data?.iconUrl}
          alt={data?.name}
        />
      </a>
    </div>
  );
}

export default MediaIcon;
