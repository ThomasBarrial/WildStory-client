import React, { Dispatch, SetStateAction } from 'react';
import edit from '../../../assets/icons/edit.svg';

interface IProps {
  isOpen: Dispatch<SetStateAction<boolean>>;
  landing: string | undefined;
}

function Landing({ isOpen, landing }: IProps): JSX.Element {
  return (
    <div>
      <button
        type="button"
        onClick={() => isOpen(true)}
        className="w-full rounded-md h-32 lg:h-52 border-t border-b bg-pink bg-opacity-10 lg:border border-pink"
        style={{
          backgroundImage: `url(${landing})`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-10 transform duration-500 hover:bg-opacity-60 flex items-end text-pink font-bold px-5">
          <img
            className="h-6 w-6 transform translate-y-3 duration-500 hover:scale-125"
            src={edit}
            alt="edit"
          />
        </div>
      </button>
    </div>
  );
}

export default Landing;
