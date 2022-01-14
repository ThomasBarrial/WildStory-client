import React, { useState } from 'react';

interface IProps {
  item: IPost;
}

function TextPost({ item }: IProps): JSX.Element {
  const [istext, setIsText] = useState(true);

  return (
    <div className="mx-3 lg:mx-0 pb-5">
      <p className="text-xs font-bold mt-3">
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
      {item.text.split('').length > 450 && (
        <button
          onClick={() => setIsText((c) => !c)}
          type="button"
          className="text-sm underline"
        >
          {istext ? 'Plus..' : 'moins'}
        </button>
      )}
    </div>
  );
}

export default TextPost;
