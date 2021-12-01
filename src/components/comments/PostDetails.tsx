import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/request';
import AvatarUser from '../post/AvatarUser';

interface IProps {
  postData: IPost | undefined;
}

function PostDetails({ postData }: IProps): JSX.Element {
  const { data: userData } = useQuery<IUser, AxiosError>(
    ['userPost', postData?.userId],
    () => user.getOne(postData?.userId)
  );

  return (
    <div className="pb-5">
      <AvatarUser userId={userData?.id} />
      <p className="text-sm font-normal mx-3 lg:mx-0">{postData?.text}</p>
      {userData?.createdAt !== undefined && (
        <div className="flex mt-3 items-center justify-between">
          <p className="text-xs">
            posted : {new Date(userData.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
