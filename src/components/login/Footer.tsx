import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <div>
      <div className="flex w-full mt-1 lg:w-10/12  text-xs font-bold items-start">
        <p>Need a new account</p>
        <Link to="/signup">
          <button className="font-bold text-pink ml-2 underline" type="button">
            Signup
          </button>
        </Link>
      </div>
      <div className="text-xs w-full items-start flex  mt-10">
        <p>In collaboration with</p>
        <a
          href="https://digitalcopilote.io/"
          target="_blank"
          rel="noreferrer"
          className="text-pink ml-2 underline"
        >
          @DigitalCopilote
        </a>
      </div>
    </div>
  );
}

export default Footer;
