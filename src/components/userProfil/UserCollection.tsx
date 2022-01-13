import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { post } from '../../API/request';
import ErrorPageToast from '../errors/ErrorToast';
import likeblack from '../../assets/icons/likeblack.svg';
import comments from '../../assets/icons/comments.svg';

interface IProps {
  userId: string | undefined;
}

function UserCollection({ userId }: IProps): JSX.Element {
  const [collection, setCollection] = useState<IPost[]>();
  const [isHover, setIsHover] = useState('');
  const { data, isLoading, error } = useQuery<IPost[], AxiosError>(
    ['userPost', userId],
    () => post.getUserPost(userId as string),
    {
      onSuccess: (d) => {
        const newArray = d.filter((p) => p.imageUrl[0] !== undefined);
        setCollection(newArray);
      },
    }
  );

  const router = useHistory();

  if (isLoading) {
    return (
      <div>
        <p className="text-pink animate-pulse p-5">...Loading</p>
      </div>
    );
  }
  if (error || !data || !collection) {
    return (
      <div className="p-5">
        <ErrorPageToast />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap lg:px-2 lg:pt-5  justify-center">
      {collection.map((item) => {
        return (
          <div
            className="lg:w-60 lg:h-60 w-1/3 h-36 "
            style={{
              backgroundImage: `url(${item.imageUrl[0]})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <button
              onClick={() => router.push(`/comments/${item.id}`)}
              onMouseEnter={() => setIsHover(item.id)}
              onMouseLeave={() => setIsHover('')}
              type="button"
              className="w-full h-full"
              style={{
                backgroundImage: `url(${item.imageUrl[0]})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {isHover === item.id && (
                <div className="h-full  items-center justify-center flex w-full bg-pink bg-opacity-0 hover:bg-opacity-30 duration-500">
                  <div className="flex w-8 mx-4 items-center">
                    <img className="mr-1" src={likeblack} alt="Likes" />
                    <p>{item.imageUrl.length}</p>
                  </div>
                  <div className="flex w-8 mx-4 items-center">
                    <img className="mr-1" src={comments} alt="Comments" />
                    <p>{item.comments.length}</p>
                  </div>
                </div>
              )}
            </button>

            <div />
          </div>
        );
      })}
    </div>
  );
}

export default UserCollection;
