/* eslint-disable react/jsx-curly-brace-presence */
import axios from 'axios';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import AlerteMessage from '../formComponents/AlerteMessage';
import trash from '../../assets/icons/pinktrash.svg';
import Loader from '../loader/Loader';

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

  // ON CLICK CLANCEL DELETE THE IMAGE FROM THE CLOUDINARY LYBRARY
  const handleDeleteImage = async (image: string) => {
    // REMOVE THE POSTED IMAGE FROM THE ARRAY OF IMAGES THAT WE GONNA UPDLOAD
    setUploadImages(uploadImages?.filter((item) => item !== image));
    const deleteBody = {
      token: deleteToken,
    };
    await axios.post(
      'https://api.cloudinary.com/v1_1/dyxboy0zg/delete_by_token',
      deleteBody
    );
  };

  // IF THE USER UPLOAD VIA URL
  const handleUrlSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // CHECK IF THE SAME URL DOESN'T EXIST ON THE ARRAY OF IMAGES THAT WE GONNA UPDLOAD
    if (uploadImages?.filter((image) => image.includes(imageUrl)).length > 0) {
      setIsPosted(true);
    } else {
      // ADD THE POSTED URL IN THE ARRAY OF IMAGES THAT WE GONNA UPDLOAD
      setUploadImages([...uploadImages, imageUrl]);
    }
  };

  // ON CHANGE OF THE FILE INPUT WE POST THE IMAGE ON CLOUDINARY
  const handleImageSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // ACTIVATE THE LOADER
    setLoading(true);
    // SET THE NEW FORM DATA VALUE WITH THE FILE DATA AND PRESETS
    formData.append('file', e.target.files?.[0] as File);
    formData.append('upload_preset', 'myUploads');
    // POST THE IMAGE ON CLOUDINARY API
    await axios
      .post('https://api.cloudinary.com/v1_1/dyxboy0zg/image/upload', formData)
      .then((res) => {
        // GET THE DELETE_TOKEN DATA WE USE FOR THE DELETE FUNCTION
        setDeleteToken(res.data.delete_token);
        // ADD THE POSTED IMAGE IN THE ARRAY OF IMAGES THAT WE GONNA UPDLOAD
        setUploadImages([...uploadImages, res.data.secure_url]);
        // DESACTIVATE THE LOADER
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
        })}
        {Loading && <Loader />}
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
