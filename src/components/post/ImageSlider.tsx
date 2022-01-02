/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

interface IProps {
  item: IPost | undefined;
}

function ImageSlider({ item }: IProps): JSX.Element {
  const [imageIndex, setImageIndex] = useState(0);

  const handleClick = () => {
    const imageArray = item?.imageUrl.length;
    if (imageArray !== undefined) {
      switch (imageIndex) {
        case imageArray - 1:
          setImageIndex(0);
          break;
        case 0:
          setImageIndex((c) => c + 1);
          break;
        default:
          setImageIndex((c) => c + 1);
      }
    }
  };

  return (
    <div className="flex flex-col overflow-x-scroll lg:w-full mb-5">
      <button
        type="button"
        onClick={handleClick}
        className="w-screen h-80 lg:rounded-md md:h-tablet xl:h-desktop md:w-full lg:border-none border-t border-b  border-pink"
        style={{
          backgroundImage: `url(${item?.imageUrl[imageIndex]})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="flex h-full justify-center items-end pb-2">
          {item?.imageUrl.map((image) => {
            return (
              <div
                key={image}
                className={`h-3 w-3 mx-1 ${
                  imageIndex === item?.imageUrl.indexOf(image)
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
