import React from 'react';

interface IProps {
  name: string;
  children: string | undefined;
}

function Info({ name, children }: IProps): JSX.Element {
  return (
    <div>
      <div className="mb-5 lg:my-7 border-b border-pink pb-2">
        <p className="font-bold">{name}</p>
        <p className="lg:mt-1 font-thin">{children}</p>
      </div>
    </div>
  );
}

export default Info;
