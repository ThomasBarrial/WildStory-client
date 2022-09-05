import React from 'react';

function SidebarLoader(): JSX.Element {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-5/12 bg-lightblack rounded" />
      <div className="h-1 border-b-2 border-lightblack mt-3" />
      <div className="h-3 w-8/12 mt-5 bg-lightblack rounded" />
      <div className="h-3 w-8/12 mt-5 bg-lightblack rounded" />
      <div className="h-3 w-8/12 mt-5 bg-lightblack rounded" />
      <div className="h-3 w-8/12 mt-5 bg-lightblack rounded" />
    </div>
  );
}

export default SidebarLoader;
