import React from 'react';
import logo from '../../assets/logo3.png';

function Header(): JSX.Element {
  return (
    <div>
      <img
        className="h-16  transform -translate-x-2 lg:-translate-x-5 lg:h-20"
        src={logo}
        alt="WildStory"
      />
      <p className=" text-sm text-left lg:text-sm">
        Take part in a network of digital players all over Europe
      </p>
    </div>
  );
}

export default Header;
