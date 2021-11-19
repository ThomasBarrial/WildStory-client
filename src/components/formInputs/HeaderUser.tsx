import React from 'react';
import tlc from '../../assets/trc.webp';
import logo from '../../assets/WildStory.webp';

function HeaderUser({ title }: { title: string }): JSX.Element {
  return (
    <div>
      {' '}
      <img className="absolute -top-3 z-50 right-0" src={tlc} alt="." />
      <div className="mx-4 lg:w-8/12 lg:mx-auto">
        <img className="h-10" src={logo} alt="WildStory" />
        <h3 className="mt-5">welcome on the wilders community !!!</h3>
        <h2 className="font-bold mb-10 mt-2">{title}</h2>
      </div>
    </div>
  );
}

export default HeaderUser;
