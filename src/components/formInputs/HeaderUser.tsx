import React from 'react';
import { Link } from 'react-router-dom';
import tlc from '../../assets/trc.webp';
import logo from '../../assets/WildStory.webp';

function HeaderUser({
  title,
  userUpdateid,
}: {
  title: string;
  userUpdateid: string | undefined;
}): JSX.Element {
  return (
    <div>
      {' '}
      {!userUpdateid && (
        <img className="absolute -top-3 z-50 right-0" src={tlc} alt="." />
      )}
      <div className="mx-4 lg:w-8/12 lg:mx-auto">
        {!userUpdateid && (
          <div>
            <img className="h-10" src={logo} alt="WildStory" />
            <h3 className="mt-5">welcome on the wilders community !!!</h3>
          </div>
        )}
        <div className="flex w-full items-end justify-between">
          <h2
            className={`font-bold mt-2 ${
              userUpdateid !== undefined ? `text-2xl` : ` mb-10`
            }`}
          >
            {title}
          </h2>
          {userUpdateid && (
            <Link to="/logout">
              <button className="text-pink underline" type="button">
                logout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderUser;
