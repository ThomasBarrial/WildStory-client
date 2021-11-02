import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
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
      {data?.map((item) => {
        return (
          <div className="my-12" key={item.id}>
            <div className="border-b border-pink">
              <AvatarUser user={item.user} />
              {item.imageUrl.length !== 0 && <ImageSlider item={item} />}
              <TextPost item={item} />
            </div>
            <Link to={`/comments/${item.id}`}>
              <button
                className="text-sm mx-3 transform underline cursor-pointer mt-5"
                type="button"
              >
                see {item.comments.length} comments{' '}
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ListPost;
