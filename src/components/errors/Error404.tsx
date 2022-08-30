import React from 'react';
import { useHistory } from 'react-router';
import bg404 from '../../assets/bg404.png';

function Error404(): JSX.Element {
  const router = useHistory();
  return (
    <div
      className="pt-10  h-96  px-4 lg:px-0"
      style={{
        backgroundImage: `url(${bg404})`,
        backgroundPosition: 'right',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h4 className="text-pink text-2xl lg:text-4xl font-bold">
        404 Lost in the space
      </h4>
      <p className="mt-2 text-xs">You can try later or contact the support :</p>
      <a
        target="_blank"
        rel="noreferrer"
        href="mailto:contact.wildstory@gmail.com"
        className="text-pink underline text-xs"
      >
        contact.wildstory@gmail.com
      </a>
      <br />
      <button
        className="bg-pink text-black mt-5 font-bold rounded-md p-2"
        onClick={() => router.push('/')}
        type="button"
      >
        back home
      </button>
    </div>
  );
}

export default Error404;
