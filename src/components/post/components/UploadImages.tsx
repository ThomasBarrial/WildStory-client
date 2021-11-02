/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AlerteMessage from '../../Forms/AlerteMessage';

interface IProps {
  setUploadImages: Dispatch<SetStateAction<string[]>>;
  uploadImages: string[];
}

function UploadImages({ setUploadImages, uploadImages }: IProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [isPosted, setIsPosted] = useState(false);
  const [isArray, setIsArray] = useState(true);

  const handleDeleteImage = (image: string) => {
    for (let i = 0; i < uploadImages.length; i += 1) {
      if (uploadImages[i] === image) {
        uploadImages.splice(i, 1);
      }
    }
  };

  useEffect(() => {
    if (isArray === false) {
      setIsArray(true);
    }
  }, [uploadImages]);

  return (
    <div>
      <div className="flex flex-wrap mt-10">
        {isArray && (
          <div>
            {uploadImages.map((image) => {
              return (
                <div
                  key={image}
                  className="h-20 w-20 my-2 lg:h-32 lg:w-32 mx-2 border border-pink rounded-lg"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsArray(false);
                      handleDeleteImage(image);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <form className="mt-10 flex flex-col" action="UploadImages">
        <label>Upload your images</label>
        <input
          className="bg-black mt-3 border focus:outline-none p-2 border-pink"
          type="text"
          onChange={(e) => {
            setImageUrl(e.target.value);
            setIsPosted(false);
          }}
        />

        {isPosted && (
          <AlerteMessage>You already upload this image !!</AlerteMessage>
        )}
        {uploadImages.length >= 10 ? (
          <AlerteMessage>You can not upload more then 10 images</AlerteMessage>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (
                uploadImages.filter((image) => image.includes(imageUrl))
                  .length > 0
              ) {
                setIsPosted(true);
              } else {
                setUploadImages([...uploadImages, imageUrl]);
              }
            }}
            className="mt-5 border border-pink text-pink py-2 w-6/12"
          >
            Add image
          </button>
        )}
      </form>
    </div>
  );
}

export default UploadImages;
