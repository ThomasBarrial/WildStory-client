import React from 'react';
import { Switch } from 'react-router-dom';
import Navabar from '../components/navbar/Navabar';
import Routes from '../router';

function Layout(): JSX.Element {
  return (
    <div className="h-screen w-screen bg-pink flex flex-col pb-5 lg:pb-2  text-5xl bg-darkBlue font-lexend text-white font-bold">
      <Navabar />

      <div className="bg-black h-full rounded-3xl overflow-y-scroll">
        <Switch>
          <Routes />
        </Switch>{' '}
      </div>
    </div>
  );
}

export default Layout;
