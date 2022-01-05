import React from 'react';

function ErrorPageToast(): JSX.Element {
  return (
    <div>
      <h4 className="text-pink text-sm font-bold">
        Oops Something went wrong !!
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
    </div>
  );
}

export default ErrorPageToast;
