import React, { useState } from 'react';
import like from '../../../assets/icons/likebutton.svg';

interface IProps {
  item: IPost;
}

function TextPost({ item }: IProps): JSX.Element {
  const [istext, setIsText] = useState(true);

  return (
    <div className="mx-3 lg:mx-0 pb-5">
      <div className="flex justify-between">
        <h3 className="text-lg">{item.title}</h3>
        <div className="flex">
          <img src={like} alt="like" />
          <p className="text-base mx-2">
            {item.likes === null ? '0' : item.likes}
          </p>
        </div>
      </div>
      <p className="text-xs mt-3">
        posted : {new Date(item.createdAt).toLocaleDateString('fr-FR')}
      </p>
      <p
        className={`text-sm mt-1 font-thin leading-7 lg:leading-loose ${
          istext && 'max-h-28 overflow-hidden'
        }
     `}
      >
        {item.text}
      </p>
      <button
        onClick={() => setIsText((c) => !c)}
        type="button"
        className="text-sm underline"
      >
        {istext ? 'Plus..' : 'moins'}
      </button>
    </div>
  );
}

export default TextPost;
