import React from 'react';
import Postloader from './Postloader';

function UserPageLoader(): JSX.Element {
  return (
    <div className="w-full mb-10 lg:bg-dark rounded-md lg:px-0 lg:pt-0 mt-5 ">
      <div className="h-44 rounded-t-md animate-pulse lg:h-52 bg-lightblack" />
      <div className="flex flex-col items-end">
        <div className="w-24 h-24 flex items-end z-20 bg-lightblack rounded-full border-2 border-black mr-6 transform -translate-y-12" />
      </div>
      <div className="transform -translate-y-12">
        <div className="px-5 animate-pulse">
          <div className="h-7 w-5/12 mt-5 rounded bg-lightblack" />
          <div className="h-3 w-8/12 mt-3 rounded bg-lightblack" />
        </div>
        <div className="flex animate-pulse justify-end mt-8 mr-4">
          <div className="h-3 ml-4 bg-lightblack rounded w-24" />
          <div className="h-3 ml-4 bg-lightblack rounded w-24" />
          <div className="h-3 ml-4 bg-lightblack rounded w-24" />
        </div>

        <div className="mt-10 animate-pulse flex justify-between  border-b-2 border-lightblack pb-3 px-5">
          <div className="w-9/12 flex justify-between">
            <div className="h-3 w-2/12 rounded bg-lightblack" />
            <div className="h-3 w-2/12 rounded bg-lightblack" />
            <div className="h-3 w-2/12 rounded bg-lightblack" />
            <div className="h-3 w-2/12 rounded bg-lightblack" />
          </div>
          <div className="h-3 w-2/12 rounded bg-lightblack" />
        </div>
        <Postloader />
      </div>
    </div>
  );
}

export default UserPageLoader;
