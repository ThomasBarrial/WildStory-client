/* eslint-disable react/jsx-curly-brace-presence */
import axios from 'axios';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
// import 'react-multi-carousel/lib/styles.css';
import { toast } from 'react-toastify';
import AlerteMessage from '../formComponents/AlerteMessage';
import FileInput from '../formComponents/FileInput';
import ImageUploaded from '../uploadImage/ImageUploaded';

interface IProps {
  setUploadImages: Dispatch<SetStateAction<string[]>>;
  uploadImages: string[];
}

function UploadImages({ setUploadImages, uploadImages }: IProps): JSX.Element {
  const formData = new FormData();
  const [deleteToken, setDeleteToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ON CHANGE OF THE FILE INPUT WE POST THE IMAGE ON CLOUDINARY
  const handleImageSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // ACTIVATE THE LOADER
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.toJSON().status === 400) {
          setIsLoading(false);
          toast('⚠️ Files size too large');
        }
      });
  };

  return (
    <div>
      <div className="flex flex-wrap mt-2 w-full">
        {/* {uploadImages.length === 0 && (
          <FileInput
            isLoading={isLoading}
            isPreview
            handleImageSubmit={handleImageSubmit}
          />
        )} */}
        {/* <Carousel
          ssr
          className="scroll-snap-x w-full"
          responsive={responsive}
          showDots={false}
          swipeable
          draggable
        >
          {uploadImages?.map((image) => {
            return (
              <div key={image} className="w-full">
                <ImageUploaded
                  isCaroussel
                  image={image}
                  deleteToken={deleteToken}
                  setUploadImages={setUploadImages}
                  uploadImages={uploadImages}
                />
              </div>
            );
          })}
        </Carousel> */}
        <p>Upload Medias</p>
      </div>

      <form
        className="mt-2 flex w-full items-center flex-wrap"
        action="UploadImages"
      >
        {uploadImages?.map((image) => {
          return (
            <div key={image}>
              <ImageUploaded
                isCaroussel={false}
                image={image}
                deleteToken={deleteToken}
                setUploadImages={setUploadImages}
                uploadImages={uploadImages}
              />
            </div>
          );
        })}
        <FileInput
          isLoading={isLoading}
          isPreview={false}
          handleImageSubmit={handleImageSubmit}
        />

        {uploadImages?.length >= 10 && (
          <AlerteMessage>You can not upload more then 10 images</AlerteMessage>
        )}
      </form>
    </div>
  );
}

export default UploadImages;
