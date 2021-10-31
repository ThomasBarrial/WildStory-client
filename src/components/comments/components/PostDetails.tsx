import React from 'react';
import AvatarUser from '../../post/components/AvatarUser';

interface IProps {
  data: IPost;
}

function PostDetails({ data }: IProps): JSX.Element {
  return (
    <div className="mt-5 border-b border-pink pb-5">
      <AvatarUser user={data.user} />
      <p className="text-sm font-normal mx-3">{data.text}</p>
      <div className="flex mx-3 mt-3 items-center justify-between">
        <p className="text-xs">
          posted : {new Date(data.createdAt).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </div>
  );
}

export default PostDetails;
