import React, { Dispatch, SetStateAction } from 'react';
import Formations from './Components/Formations';
import SearchBar from './Components/SearchBar';

interface IProps {
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
}

function SideBarDesktop({ setIsSideBar }: IProps): JSX.Element {
  return (
    <div className="w-3/12 pt-16 hidden lg:flex flex-col p-5">
      <div className="bg-dark fixed w-80 rounded-md p-4  h-48 text-white">
        <Formations setIsSideBar={setIsSideBar} />
      </div>
      <div className="bg-dark w-80 fixed rounded-md p-2  h-40 mt-52 text-white my-5">
        <SearchBar />
      </div>
      <div className="bg-dark w-80 fixed rounded-md p-2  h-40 mt-96 text-white my-5">
        Topics
      </div>
    </div>
  );
}

export default SideBarDesktop;
