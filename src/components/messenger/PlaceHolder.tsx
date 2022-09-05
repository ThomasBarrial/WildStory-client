import React, { Dispatch, SetStateAction } from 'react';
import messages from '../../assets/icons/messages.svg';

interface IProps {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function PlaceHolder({ setIsModal }: IProps): JSX.Element {
  return (
    <div className=" w-full flex flex-col items-center justify-center">
      <img src={messages} alt="" className="h-24 w-24" />
      <p className="font-bold text-xl text-pink mt-5">Your conversations</p>
      <p className="text-pink mt-2">Send private messages to your friends </p>
      <button
        onClick={() => {
          setIsModal(true);
        }}
        className="mt-5  bg-pink text-dark rounded-md px-10 py-1 text-md font-thin"
        type="button"
      >
        send message
      </button>
    </div>
  );
}

export default PlaceHolder;
