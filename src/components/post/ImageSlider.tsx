/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface IProps {
  item: IPost;
}

function ImageSlider({ item }: IProps): JSX.Element {
  return (
    <div className="flex flex-col overflow-x-scroll lg:w-full mb-5">
      {item.imageUrl.map((image) => {
        return (
          <div
            key={image}
            className="w-screen h-80 lg:rounded-md md:h-tablet xl:h-desktop md:w-full "
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        );
      })}
    </div>
  );
}

export default ImageSlider;
