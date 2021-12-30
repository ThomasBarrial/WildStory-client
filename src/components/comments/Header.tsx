import React from 'react';

import { Link } from 'react-router-dom';
import back from '../../assets/icons/back.svg';

function Header(): JSX.Element {
  return (
    <div className="flex  w-full justify-between items-end h-20 pb-5 px-4 lg:px-0  bg-black">
      <Link to="/">
        <img src={back} alt="GoBack" />
      </Link>
      <h3 className="text-lg">Comments</h3>
    </div>
  );
}

export default Header;
