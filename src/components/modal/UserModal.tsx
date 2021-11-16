import React, { Dispatch, SetStateAction } from 'react';
import cross from '../../assets/icons/close.svg';

interface IProps {
  isOpen: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string>>;
  label: string;
}

function UserModal({ isOpen, setImage, label }: IProps): JSX.Element {
  return (
    <div className="w-screen fixed inset-0 z-50 h-full  bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-11/12 lg:w-6/12 bg-black border rounded-md border-pink p-5 lg:p-8">
        <div className="w-full">
          <button
            onClick={() => {
              isOpen(false);
              setImage((prev) => prev);
            }}
            className="w-full flex justify-end"
            type="button"
          >
            <img src={cross} alt="isOpen" />
          </button>
          <label htmlFor="Landing" className="flex w-full flex-col font-bold">
            Update {label} Image
            <input
              id="landing"
              type="text"
              placeholder="Url..."
              onChange={(e) => setImage(e.target.value)}
              className="bg-black mt-2 border rounded-none focus:outline-none p-2 border-white"
            />
          </label>
        </div>
        <p className="mt-2">
          If you need create a url
          <a
            className="ml-2 underline"
            rel="noreferrer"
            target="_blank"
            href="https://fr.imgbb.com/"
          >
            go there
          </a>
        </p>
        <button
          onClick={() => isOpen(false)}
          type="button"
          className="mt-5 border border-white text-white py-2 w-full lg:w-6/12"
        >
          ok
        </button>
      </div>
    </div>
  );
}

export default UserModal;
