import React from 'react';

function Postloader(): JSX.Element {
  return (
    <div className="my-5 lg:mt-0 mt-5 pb-5  border-b border-pink lg:border-none  lg:bg-dark lg:rounded-lg lg:p-7">
      <div className="flex animate-pulse items-center px-4 lg:p-0">
        <div className="h-12 w-12 bg-lightblack rounded-full" />
        <div>
          <div className="h-4 w-52 ml-3 rounded bg-lightblack" />
          <div className="h-3 mt-2 w-32 rounded ml-3 bg-lightblack" />
        </div>
      </div>
      <div className="h-80 animate-pulse lg:rounded-md md:h-tablet xl:h-desktop md:w-full bg-lightblack my-3" />
      <div className="px-4 animate-pulse lg:px-0">
        <div className="h-3 mt-2 w-52 rounded  bg-lightblack" />
        <div className="h-3 mt-3 rounded  bg-lightblack" />
        <div className="h-3 mt-2 rounded  bg-lightblack" />
        <div className="h-3 mt-2 rounded  bg-lightblack" />
        <div className="border-b h-1 border-lightblack mt-5" />
        <div className="mt-5 animate-pulse flex justify-between px-4 lg:px-0">
          <div className="h-5 w-16 bg-lightblack rounded" />
          <div className="h-5 w-16 bg-lightblack rounded" />
          <div className="h-5 w-16 bg-lightblack rounded" />
        </div>
      </div>
    </div>
  );
}

export default Postloader;
