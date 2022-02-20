import React, { Dispatch, SetStateAction } from 'react';
import edit from '../../../assets/icons/edit.svg';

interface IProps {
  avatar: string | undefined;
  isOpen: Dispatch<SetStateAction<boolean>>;
}

function Avatar({ avatar, isOpen }: IProps): JSX.Element {
  return (
    <div className="w-full flex flex-col items-end">
      <button
        onClick={() => isOpen(true)}
        type="button"
        className="w-24 h-24 rounded-full border bg-black border-pink mr-6 transform -translate-y-12"
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="h-full w-full bg-pink rounded-full bg-opacity-10 transform duration-500 hover:bg-opacity-60 flex items-end text-pink font-bold p-2">
          <img
            className="h-6 w-6 transform -translate-x-3 duration-500 hover:scale-125"
            src={edit}
            alt="edit"
          />
        </div>
      </button>
    </div>
  );
}

export default Avatar;
