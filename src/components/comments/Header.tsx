import React from 'react';

import { Link } from 'react-router-dom';
import back from '../../assets/icons/back.svg';

function Header(): JSX.Element {
  return (
    <div className="flex rounded-xl lg:rounded-md w-full lg:w-6/12 md:w-10/12 justify-between items-end h-20 pb-5 px-4 fixed bg-black">
      <Link to="/">
        <img src={back} alt="GoBack" />
      </Link>
      <h3 className="text-lg">Comments</h3>
    </div>
  );
}

export default Header;
