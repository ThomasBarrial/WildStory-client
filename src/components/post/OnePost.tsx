import React from 'react';
import { Link } from 'react-router-dom';
import { useUserFromStore } from '../../store/user.slice';
import AvatarUser from './AvatarUser';
import ImageSlider from './ImageSlider';
import Likes from './Likes';
import Dot from './Options/Dot';
import SavePost from './SavePost';
import TextPost from './TextPost';
import comments from '../../assets/icons/commentpink.svg';

interface IProps {
  item: IPost;
}

function OnePost({ item }: IProps): JSX.Element {
  const { user } = useUserFromStore();
  const IdUserFormStore = user.id;

  return (
    <div className="my-5 lg:mt-0 mt-5 pb-5  border-b border-pink lg:border-none  lg:bg-dark lg:rounded-lg lg:p-7">
      <div className="lg:border-b border-pink">
        <div className="flex w-full justify-between items-end">
          <AvatarUser userId={item.userId} />
          {IdUserFormStore === item.userId && <Dot postId={item.id} />}
        </div>
        {item.imageUrl.length !== 0 && <ImageSlider item={item} />}
        <TextPost item={item} />
      </div>
      <div className="flex items-center mx-4 lg:mx-0 lg:w-full justify-between mt-5">
        <Likes item={item} />
        <Link to={`/comments/${item.id}`}>
          <button
            className="text-sm flex items-center  transform  cursor-pointer"
            type="button"
          >
            <img src={comments} className="h-5 mr-2" alt="" />
            <p className="text-sm">{item.comments.length} Replies</p>
          </button>
        </Link>
        <SavePost item={item} />
      </div>
    </div>
  );
}

export default OnePost;
