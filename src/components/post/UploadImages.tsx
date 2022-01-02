/* eslint-disable react/jsx-curly-brace-presence */
import axios from 'axios';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import AlerteMessage from '../formComponents/AlerteMessage';
import trash from '../../assets/icons/pinktrash.svg';

interface IProps {
  setUploadImages: Dispatch<SetStateAction<string[]>>;
  uploadImages: string[];
}

function UploadImages({ setUploadImages, uploadImages }: IProps): JSX.Element {
  const [Loading, setLoading] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isPosted, setIsPosted] = useState(false);
  const formData = new FormData();
  const [deleteToken, setDeleteToken] = useState('');

  const handleDeleteImage = async (image: string) => {
    setUploadImages(uploadImages?.filter((item) => item !== image));
    const deleteBody = {
      token: deleteToken,
    };
    await axios.post(
      'https://api.cloudinary.com/v1_1/dyxboy0zg/delete_by_token',
      deleteBody
    );
  };

  const handleUrlSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (uploadImages?.filter((image) => image.includes(imageUrl)).length > 0) {
      setIsPosted(true);
    } else {
      setUploadImages([...uploadImages, imageUrl]);
    }
  };

  const handleImageSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    formData.append('file', e.target.files?.[0] as File);
    formData.append('upload_preset', 'myUploads');

    await axios
      .post('https://api.cloudinary.com/v1_1/dyxboy0zg/image/upload', formData)
      .then((res) => {
        setDeleteToken(res.data.delete_token);
        setUploadImages([...uploadImages, res.data.secure_url]);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="flex flex-wrap mt-2">
        {uploadImages?.map((image) => {
          return (
            <div key={image} className="">
              <div
                className="h-20 overflow-hidden w-20 my-2 lg:h-32 lg:w-48 mx-2 border border-pink rounded-sm"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
                {Loading && <p>...Loading</p>}
              </div>
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
        })}
      </div>

      <form className="mt-2 flex flex-col" action="UploadImages">
        <label htmlFor="upload" className="font-bold">
          Upload your image
          <input
            className="bg-black rounded-sm w-full mt-2 border focus:outline-none p-2 border-white"
            type="file"
            name="file"
            onChange={(e) => handleImageSubmit(e)}
          />
          {!isUrl && (
            <button
              type="button"
              onClick={() => setIsUrl(true)}
              className="text-sm mt-2 text-pink underline"
            >
              upload by link
            </button>
          )}
          {isUrl && (
            <div className="mt-5">
              <p className="text-sm">Enter your media Link</p>
              <input
                className="bg-black rounded-sm w-full border my-2 focus:outline-none p-2 border-white"
                type="text"
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setIsPosted(false);
                }}
              />
            </div>
          )}
        </label>

        {isPosted && (
          <AlerteMessage>You already upload this image !!</AlerteMessage>
        )}
        {uploadImages?.length >= 10 ? (
          <AlerteMessage>You can not upload more then 10 images</AlerteMessage>
        ) : (
          <div>
            {isUrl && (
              <button
                type="submit"
                onClick={(e) => handleUrlSubmit(e)}
                className="mt-2 mb-5 border rounded-md border-pink text-pink py-2 w-6/12"
              >
                Add image
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadImages;
