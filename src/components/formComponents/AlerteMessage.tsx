import React from 'react';

function AlerteMessage({ children }: { children: string }): JSX.Element {
  return (
    <div>
      <p className="text-pink text-xs mt-2">{children}</p>
    </div>
  );
}

export default AlerteMessage;
