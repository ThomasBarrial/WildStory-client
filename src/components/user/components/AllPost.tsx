import React from 'react';

function AllPost({ item }: { item: IPost }): JSX.Element {
  return (
    <div
      className="h-36 w-full border border-pink"
      style={{
        backgroundImage: `url(${item.imageUrl[0]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}

export default AllPost;
