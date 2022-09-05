/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface IProps {
  item: IPost;
}

function ImageSlider({ item }: IProps): JSX.Element {
  return (
    <div className="mb-5">
      <Carousel showThumbs={false} showIndicators>
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
      </Carousel>
    </div>
  );
}

export default ImageSlider;
