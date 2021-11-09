/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Dispatch, SetStateAction, useState } from 'react';
import AlerteMessage from '../../Forms/AlerteMessage';

interface IProps {
  setUploadImages: Dispatch<SetStateAction<string[]>>;
  uploadImages: string[];
}

function UploadImages({ setUploadImages, uploadImages }: IProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [isPosted, setIsPosted] = useState(false);

  const handleDeleteImage = (image: string) => {
    setUploadImages(uploadImages?.filter((item) => item !== image));
  };

  const handleImageSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (uploadImages?.filter((image) => image.includes(imageUrl)).length > 0) {
      setIsPosted(true);
    } else {
      setUploadImages([...uploadImages, imageUrl]);
    }
  };
  return (
    <div>
      <div className="flex flex-wrap mt-2">
        {uploadImages?.map((image) => {
          return (
            <div key={image} className="">
              <div className="h-20 overflow-hidden w-20 my-2 lg:h-32 lg:w-48 mx-2 border border-pink rounded-sm">
                <img
                  className="h-full w-full flex items-center justify-center"
                  src={image}
                  alt="Wrong Url..."
                />
              </div>
              <button
                className="h-full text-pink font-bold text-xs flex m-1"
                type="button"
                onClick={() => {
                  handleDeleteImage(image);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      <form className="mt-2 flex flex-col" action="UploadImages">
        <label className="font-bold">Upload your images</label>
        <input
          className="bg-black mt-2 border focus:outline-none p-2 border-pink"
          type="text"
          onChange={(e) => {
            setImageUrl(e.target.value);
            setIsPosted(false);
          }}
        />

        {isPosted && (
          <AlerteMessage>You already upload this image !!</AlerteMessage>
        )}
        {uploadImages?.length >= 10 ? (
          <AlerteMessage>You can not upload more then 10 images</AlerteMessage>
        ) : (
          <button
            type="submit"
            onClick={(e) => handleImageSubmit(e)}
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
