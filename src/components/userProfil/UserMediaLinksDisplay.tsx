import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { mediaLinks } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import ErrorPageToast from '../errors/ErrorToast';
import MediaIcon from '../user/MediaIcon';

function UserMediaLinksDisplay({
  userId,
}: {
  userId: string | undefined;
}): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserFromStore();
  const {
    data: userMediaLinksData,
    isLoading: userMediaLinkLoad,
    error: userMediaLinkError,
  } = useQuery<IMediaLink[], AxiosError>(['userMediaLinks', userId], () =>
    mediaLinks.getUsersMediaLink(userId as string)
  );

  if (userMediaLinkLoad) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (userMediaLinkError) {
    return (
      <div className="pt-10">
        <ErrorPageToast />
      </div>
    );
  }

  return (
    <div className="w-full flex items-end justify-between">
      <div className="flex">
        {userMediaLinksData?.map((media) => {
          return (
            <div key={media.id}>
              <MediaIcon media={media} />
            </div>
          );
        })}
      </div>
      {userId === user.id && userMediaLinksData?.length !== 0 && (
        <Link to={`/editsocialmedia/${userId}`}>
          <p className="underline mt-3 lg:mt-5 text-sm">Edit your links</p>
        </Link>
      )}
      {userMediaLinksData?.length === 0 && userId === id && (
        <p className="text-pink font-thin my-2 w-full flex items-center">
          There is no social media links for now{' '}
          <Link to={`/editsocialmedia/${userId}`}>
            <p className="ml-2 text-sm underline">Edit your links</p>
          </Link>
        </p>
      )}
    </div>
  );
}

export default UserMediaLinksDisplay;
