import React from 'react';

function SearchBar(): JSX.Element {
  return (
    <div>
      {' '}
      <h4 className="text-lg border-b border-pink mb-5">Search</h4>
      <input
        className="border px-2 py-1 bg-transparent focus:outline-none"
        type="text"
        name=""
        id=""
      />
      <button
        className="border text-pink focus:outline-none border-pink mt-4 py-1 w-6/12 text-sm"
        type="button"
      >
        search
      </button>
    </div>
  );
}

export default SearchBar;
