import React from 'react';
import loader from '../../assets/Loader.gif';

function Loader(): JSX.Element {
  return (
    <div>
      <img className="w-32" src={loader} alt="" />
    </div>
  );
}

export default Loader;
