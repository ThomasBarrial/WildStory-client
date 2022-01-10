import React from 'react';
import { Link } from 'react-router-dom';
import { useUserFromStore } from '../../store/user.slice';
import AvatarUser from './AvatarUser';
import ImageSlider from './ImageSlider';
import Dot from './Options/Dot';
import TextPost from './TextPost';

interface IProps {
  item: IPost;
}

function OnePost({ item }: IProps): JSX.Element {
  const { user } = useUserFromStore();
  const IdUserFormStore = user.id;

  return (
    <div className="my-5 lg:mt-0 mt-10 pb-5  border-b border-pink lg:border-none  lg:bg-dark lg:rounded-lg lg:p-7">
      <div className="lg:border-b border-pink">
        <div className="flex w-full justify-between items-end">
          <AvatarUser userId={item.userId} />
          {IdUserFormStore === item.userId && <Dot postId={item.id} />}
        </div>
        {item.imageUrl.length !== 0 && <ImageSlider item={item} />}
        <TextPost item={item} />
      </div>
      <Link to={`/comments/${item.id}`}>
        <button
          className="text-sm mx-3 lg:mx-0 transform underline cursor-pointer lg:mt-5"
          type="button"
        >
          see {item.comments.length} comments{' '}
        </button>
      </Link>
    </div>
  );
}

export default OnePost;
