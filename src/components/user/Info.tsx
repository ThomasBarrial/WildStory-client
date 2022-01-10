import React from 'react';

interface IProps {
  name: string;
  children: string | undefined;
}

function Info({ name, children }: IProps): JSX.Element {
  return (
    <div>
      <div className="mb-5 lg:mb-5 border-b flex border-pink pb-2">
        <p className="font-black">{name} : </p>
        <pre className="font-lexend"> {children}</pre>
      </div>
    </div>
  );
}

export default Info;
