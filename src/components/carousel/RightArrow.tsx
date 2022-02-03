import React from 'react';
import rightarrow from '../../assets/icons/rightarrow.svg';

interface IProps {
  onClick: () => void;
}

function RightArrow({ onClick }: IProps): JSX.Element {
  return (
    <button
      type="button"
      className="z-9999  right-20 arrow  lg:right-40 text-white text-24 md:px-8 rounded-full bg-black bg-opacity-50 "
      onClick={() => onClick()}
    >
      <img src={rightarrow} alt="swip" />
    </button>
  );
}

export default RightArrow;
