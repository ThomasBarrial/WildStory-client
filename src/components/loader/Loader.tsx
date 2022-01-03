import React from 'react';
import loader from '../../assets/loader.gif';

function Loader(): JSX.Element {
  return (
    <div>
      <img className="w-44" src={loader} alt="" />
    </div>
  );
}

export default Loader;
