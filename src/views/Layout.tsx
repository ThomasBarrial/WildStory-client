import React from 'react';
import logo from '../assets/logo.png';

function Layout(): JSX.Element {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-5xl bg-darkBlue font-lexend text-white font-bold">
      <img src={logo} alt="" />
    </div>
  );
}

export default Layout;
