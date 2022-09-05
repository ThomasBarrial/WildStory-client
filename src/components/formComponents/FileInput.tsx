import React, { ChangeEvent } from 'react';
import uploadImage from '../../assets/icons/uploadimage.svg';

interface IProps {
  handleImageSubmit: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isPreview: boolean;
  isLoading: boolean;
}

function FileInput({
  handleImageSubmit,
  isPreview,
  isLoading,
}: IProps): JSX.Element {
  return (
    <div className={`${isPreview && 'w-full'}`}>
      <label
        htmlFor="upload"
        className={`font-bold flex items-center inset-0 justify-center ${
          isPreview ? 'w-full lg:h-desktop h-80 my-4' : ' w-32 h-32 mb-3'
        }   rounded-md bg-pink bg-opacity-10 border border-pink transform hover:bg-opacity-20 duration-300`}
      >
        <div className="absolute">
          {isLoading ? (
            <p className="text-pink animate-pulse">...Loading</p>
          ) : (
            <div className="flex flex-col text-sm text-pink font-thin text-center items-center">
              <img
                src={uploadImage}
                alt=""
                className={`${isPreview ? 'h-24 w-24' : 'h-12 w-12'}`}
              />
              <p className={`${isPreview ? 'flex' : 'hidden'} `}>
                Upload your file
              </p>
              <p className={`${isPreview ? 'flex' : 'hidden'} mt-2`}>
                Images format rocommended: 720 x 512px
              </p>
            </div>
          )}
        </div>
        <input
          className="rounded-md w-full h-full opacity-0 border focus:outline-none p-2 cursor-pointer border-white"
          type="file"
          name="file"
          onChange={(e) => handleImageSubmit(e)}
        />
      </label>
    </div>
  );
}

export default FileInput;
