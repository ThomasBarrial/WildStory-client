import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { post } from '../../API/request';
import AvatarUser from './components/AvatarUser';
import ImageSlider from './components/ImageSlider';
import TextPost from './components/TextPost';

function ListPost(): JSX.Element {
  const { isLoading, error, data } = useQuery<IPost[], AxiosError>(
    'posts',
    () => post.getAll()
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  if (data.length === 0) return <p>No post</p>;

  return (
    <div className="w-full h-full lg:w-7/12 lg:mx-auto">
      {data.map((item) => {
        return (
          <div className="my-10 border-b border-pink pb-10" key={item.id}>
            <AvatarUser user={item.user} />
            {item.imageUrl.length !== 0 && <ImageSlider item={item} />}
            <TextPost item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default ListPost;
