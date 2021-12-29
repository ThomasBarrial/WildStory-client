import React, { Dispatch, SetStateAction } from 'react';
import close from '../../assets/icons/close.svg';
import Formations from './Components/Formations';
import Topics from './Components/Topics';

interface IProps {
  isSidebar: boolean;
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
}

function SidebarMobile({ isSidebar, setIsSideBar }: IProps): JSX.Element {
  return (
    <div
      className={` w-full h-full lg:hidden bg-black lg:bg-transparent fixed  z-50 lg:z-20 lg:right-14 lg:w-3/12 p-4 lg:pt-16   ${
        isSidebar
          ? 'transform duration-700 translate-x-0'
          : 'transform duration-700 -translate-x-full lg:translate-x-0'
      } lg:flex flex-col p-5`}
    >
      <div className="flex  my-5 w-full lg:hidden justify-between">
        <h4 className="text-xl">Menu</h4>
        <button onClick={() => setIsSideBar(false)} type="button">
          <img src={close} alt="close" />
        </button>
      </div>
      <div className="bg-dark w-full lg:w-80 rounded-md p-4  h-56 text-white">
        <Formations setIsSideBar={setIsSideBar} />
      </div>
      <div className="bg-dark w-full lg:w-80 lg:fixed rounded-md p-4  h-56 lg:mt-96 text-white my-5">
        <Topics setIsSideBar={setIsSideBar} />
      </div>
    </div>
  );
}

export default SidebarMobile;
