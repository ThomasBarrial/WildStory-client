import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { mediaIcons } from '../../API/request';
import ErrorPage from '../../views/ErrorPage';
import Loader from '../loader/Loader';

interface IProps {
  media: IMediaLink;
}

function MediaIcon({ media }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IMediaIcon, AxiosError>(
    ['oneIcon', media.iconId],
    () => mediaIcons.getOne(media.iconId)
  );

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage />;
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
