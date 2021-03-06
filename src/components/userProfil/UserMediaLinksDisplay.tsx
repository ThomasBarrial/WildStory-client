import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { mediaLinks } from '../../API/request';
import { useUserFromStore } from '../../store/user.slice';
import Error404 from '../errors/Error404';
import MediaIcon from '../user/MediaIcon';

function UserMediaLinksDisplay({
  userId,
}: {
  userId: string | undefined;
}): JSX.Element {
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
    return <Error404 />;
  }

  return (
    <div className="w-full flex items-end justify-between px-4 lg:px-7">
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
      {userMediaLinksData?.length === 0 && userId === user.id && (
        <div className="text-pink font-thin my-2 w-full flex items-center">
          There is no social media links for now{' '}
          <Link to={`/editsocialmedia/${userId}`}>
            <p className="ml-2 text-sm underline">Edit your links</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserMediaLinksDisplay;
