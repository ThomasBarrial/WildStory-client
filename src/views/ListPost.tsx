import React, { useEffect, useState } from 'react';
import AXIOS from '../API/axios';
import Error404 from '../components/errors/Error404';
import OnePost from '../components/post/OnePost';
import endScroll2 from '../assets/icons/endscroll.svg';
import ListPostLoader from '../components/skelotonLoaders/ListPostLoader';

function ListPost(): JSX.Element {
  const [listPost, setListPost] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setError] = useState('');
  const [endScroll, setIsEndScroll] = useState(false);

  // NUMBER OF POST ALREADY FETCH
  let offset = 0;

  const LoadPosts = () => {
    setIsLoading(true);
    // FETCH THE LIST OF POSTS WITH THE NUMBER OF POST ALREADY FETCH
    AXIOS.get(`/post/?limit=5&offset=${offset}`)
      .then((res) => {
        const newListPost: IPost[] = [];
        // PUT EACH POST IN THE NEW ARRAY
        res.data.forEach((po: IPost) => newListPost.push(po));

        if (newListPost.length === 0) {
          setIsEndScroll(true);
        }
        // UPDATE THE OLD LIST
        setListPost((oldListPost) => [...oldListPost, ...newListPost]);
        // STOP LOADER
        setIsLoading(false);
      })
      .catch((err) => setError(err));
    // INCREMENT THE NUMBER OF POST ALREADY FETCH
    offset += 5;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (e: any): void => {
    // CHECK IF THE USER IS AT THE BOTTOM OF THE PAGE
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight - 10
    ) {
      LoadPosts();
    }
  };
  useEffect(() => {
    LoadPosts();
    window.addEventListener('scroll', handleScroll);
  }, []);

  if (fetchError !== '' || !listPost) {
    return <Error404 />;
  }

  return (
    <div className="w-full pt-3 lg:pt-5 pb-20">
      {listPost.map((p) => {
        return (
          <div key={p.id}>
            <OnePost item={p} />
          </div>
        );
      })}
      {isLoading && <ListPostLoader />}
      {endScroll && (
        <div className="w-full bg-dark rounded-md p-5 flex animate-pulse items-center mt-10">
          <img className="h-10  w-10 mr-3" src={endScroll2} alt="" />
          <p className=" text-pink text-xl">Everythings uptodate</p>
        </div>
      )}
      {listPost.length === 0 && <p className="mt-10">No post</p>}
    </div>
  );
}

export default ListPost;
