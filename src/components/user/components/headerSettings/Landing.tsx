import React, { Dispatch, SetStateAction } from 'react';
import edit from '../../../../assets/icons/edit.svg';

interface IProps {
  isOpen: Dispatch<SetStateAction<boolean>>;
  landing: string;
}

function Landing({ isOpen, landing }: IProps): JSX.Element {
  return (
    <div>
      <button
        type="button"
        onClick={() => isOpen(true)}
        className="w-full h-32 border-b lg:border border-pink"
        style={{
          backgroundImage: `url(${landing})`,
          backgroundPosition: 'center',
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
