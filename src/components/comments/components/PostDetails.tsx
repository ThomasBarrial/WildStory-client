import React from 'react';
import AvatarUser from '../../post/components/AvatarUser';

interface IProps {
  postData: IPost | undefined;
}

function PostDetails({ postData }: IProps): JSX.Element {
  // const { data: userData } = useQuery<IUser, AxiosError>('userPost', () =>
  //   user.getOne(postData?.userId)
  // );

  return (
    <div className="mt-20  pb-5">
      <AvatarUser user={postData?.user} />
      <p className="text-sm font-normal mx-3">{postData?.text}</p>
      {postData?.createdAt !== undefined && (
        <div className="flex mx-3 mt-3 items-center justify-between">
          <p className="text-xs">
            posted : {new Date(postData.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
