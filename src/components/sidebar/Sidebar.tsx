import React from 'react';

function Sidebar(): JSX.Element {
  return (
    <div className="w-5/12 pt-16 hidden lg:flex flex-col p-5">
      <div className="bg-dark fixed w-80 rounded-md p-2  h-48 text-white">
        formations
      </div>
      <div className="bg-dark w-80 fixed rounded-md p-2  h-40 mt-52 text-white my-5">
        Search
      </div>
      <div className="bg-dark w-80 fixed rounded-md p-2  h-40 mt-96 text-white my-5">
        you may know this person
      </div>
    </div>
  );
}

export default Sidebar;
