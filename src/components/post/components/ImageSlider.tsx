/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

interface IProps {
  item: IPost;
}

function ImageSlider({ item }: IProps): JSX.Element {
  const [imageIndex, setImageIndex] = useState(0);

  const handleClick = () => {
    switch (imageIndex) {
      case item.imageUrl.length - 1:
        setImageIndex(0);
        break;
      case 0:
        setImageIndex((c) => c + 1);
        break;
      default:
        setImageIndex((c) => c + 1);
    }
  };

  return (
    <div className="flex flex-col overflow-x-scroll">
      <button
        type="button"
        onClick={handleClick}
        className="w-screen h-72 lg:h-image lg:w-full border-t border-b lg:border-r lg:border-l border-pink"
        style={{
          backgroundImage: `url(${item.imageUrl[imageIndex]})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="flex h-full justify-center items-end pb-2">
          {item.imageUrl.map((image) => {
            return (
              <div
                key={image}
                className={`h-3 w-3 mx-1 ${
                  imageIndex === item.imageUrl.indexOf(image)
                    ? `bg-pink`
                    : `bg-black`
                } rounded-full`}
              />
            );
          })}
        </div>
      </button>
    </div>
  );
}

export default ImageSlider;
