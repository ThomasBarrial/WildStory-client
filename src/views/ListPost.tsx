import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery, useQueryClient } from 'react-query';
import { post } from '../API/request';
import Error404 from '../components/errors/Error404';
import OnePost from '../components/post/OnePost';

function ListPost(): JSX.Element {
  const { inView } = useInView();
  const [limit, setLimit] = useState(0);
  const [endPostLIst, setEndPostList] = useState(false);
  const queryclient = useQueryClient();
  const [listPost, setListPost] = useState<IPost[]>([]);

  const { isLoading, error, data } = useQuery<IPost[] | string, AxiosError>(
    ['posts', limit],
    () => post.getAll(limit),
    {
      onSuccess: (p) => {
        if (p !== 'no more post') {
          setListPost(p as IPost[]);
        } else {
          setEndPostList(true);
        }
      },
    }
  );

  useEffect(() => {
    if (inView) {
      setLimit((l) => l + 15);
      if (endPostLIst === false) {
        queryclient.refetchQueries(['posts']);
      }
    }
  }, [inView]);

  if (isLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (error || !data) {
    return <Error404 />;
  }
  if (data.length === 0) return <p className="mt-10">No post</p>;

  return (
    <div className="w-full pt-3 lg:pt-5 pb-20">
      {listPost.map((p, index) => {
        return (
          <div id={index.toString()} key={p.id}>
            <OnePost item={p} />
          </div>
        );
      })}
      {/* {listPost.length !== 0 && (
        <div ref={ref} className="h-52 w-full bg-pink">
          hello
        </div>
      )} */}
    </div>
  );
}

export default ListPost;
