import React from 'react';
import { useHistory } from 'react-router';

function ErrorPage(): JSX.Element {
  const router = useHistory();
  return (
    <div className="py-5 px-5 bg-black bg-opacity-25 flex items-center justify-center  rounded-md top-0 left-0 w-screen h-full lg:h-screen fixed z-50">
      <div className="bg-dark p-7 rounded-md">
        <h4 className="text-pink text-3xl lg:text-4xl">
          Oops Something went wrong !!
        </h4>
        <p className="mt-5 mb-2">You can try later or contact the support :</p>
        <a
          target="_blank"
          rel="noreferrer"
          href="mailto:contact.wildstory@gmail.com"
          className="text-pink underline"
        >
          contact.wildstory@gmail.com
        </a>
        <br />
        <div>
          <button
            className="mt-10 ml-5 text-pink"
            type="button"
            onClick={() => router.push('/')}
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
