import React from 'react';
import Formations from './Components/Formations';
import Topics from './Components/Topics';

function SideBarDesktop(): JSX.Element {
  return (
    <div className="w-3/12 pt-16 hidden lg:flex flex-col p-5">
      <div className="bg-dark fixed w-80 rounded-md p-4  lg:w-72 xl:w-80  h-52 text-white">
        <Formations />
      </div>
      <div className="bg-dark w-80 fixed rounded-md p-4 lg:w-72 xl:w-80  h-52 mt-56 text-white my-5">
        <Topics />
      </div>
    </div>
  );
}

export default SideBarDesktop;
