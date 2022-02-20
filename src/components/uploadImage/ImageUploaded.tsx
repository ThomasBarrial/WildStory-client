import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import trash from '../../assets/icons/pinktrash.svg';

interface IProps {
  image: string;
  deleteToken: string;
  setUploadImages: Dispatch<SetStateAction<string[]>>;
  uploadImages: string[];
  isCaroussel: boolean;
}

function ImageUploaded({
  image,
  deleteToken,
  setUploadImages,
  uploadImages,
  isCaroussel,
}: IProps): JSX.Element {
  // ON CLICK CLANCEL DELETE THE IMAGE FROM THE CLOUDINARY LYBRARY
  const handleDeleteImage = async (img: string) => {
    // REMOVE THE POSTED IMAGE FROM THE ARRAY OF IMAGES THAT WE GONNA UPDLOAD
    setUploadImages(uploadImages?.filter((item: string) => item !== img));
    const deleteBody = {
      token: deleteToken,
    };
    await axios.post(
      'https://api.cloudinary.com/v1_1/dyxboy0zg/delete_by_token',
      deleteBody
    );
  };

  return (
    <div>
      {' '}
      <div
        className={`${
          isCaroussel
            ? 'h-60 lg:h-desktop w-uploadImage  mt-4'
            : 'h-32 w-32 mr-3'
        }  overflow-hidden   border border-pink rounded-md`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <button
        className=" text-pink font-bold text-xs flex transform translate-x-4 -translate-y-8"
        type="button"
        onClick={() => {
          handleDeleteImage(image);
        }}
      >
        <img src={trash} alt="" />
      </button>
    </div>
  );
}

export default ImageUploaded;
