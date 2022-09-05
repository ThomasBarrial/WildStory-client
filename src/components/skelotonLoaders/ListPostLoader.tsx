import React from 'react';
import Postloader from './Postloader';

function ListPostLoader(): JSX.Element {
  return (
    <div className="mt-10 lg:mt-4">
      <Postloader />
      <Postloader />
      <Postloader />
    </div>
  );
}

export default ListPostLoader;
