import React from 'react';
import { useHistory } from 'react-router';
import back from '../../assets/icons/back.svg';

function Header(): JSX.Element {
  const router = useHistory();
  return (
    <div className="flex  w-full justify-between items-end h-20 pb-5 px-4 lg:px-0  bg-black">
      <button type="button" onClick={() => router.goBack()}>
        <img src={back} alt="GoBack" />
      </button>
      <h3 className="text-lg">Comments</h3>
    </div>
  );
}

export default Header;
