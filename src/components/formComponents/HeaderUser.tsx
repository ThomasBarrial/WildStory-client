import React from 'react';
import { Link } from 'react-router-dom';

function HeaderUser({
  title,
  userUpdateid,
}: {
  title: string;
  userUpdateid: string | undefined;
}): JSX.Element {
  return (
    <div className="my-5">
      {' '}
      <div className="flex w-full items-end justify-between">
        <h2 className="font-bold mt-2 text-2xl">{title}</h2>
        {userUpdateid && (
          <Link to="/logout">
            <button className="text-pink underline" type="button">
              logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HeaderUser;
