import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { topics } from '../../../API/request';
import ErrorToast from '../../errors/ErrorToast';

function Topics(): JSX.Element {
  const { data, isLoading, error } = useQuery<ITopics[]>(['getAllTopcis'], () =>
    topics.getAll()
  );

  const { pathname } = useLocation();

  const router = useHistory();

  if (isLoading) {
    return <p className="text-pink animate-pulse">...Loading</p>;
  }
  if (error || !data) {
    toast(<ErrorToast />, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return <p className="text-sm text-pink">...Oops something went wrong</p>;
  }
  return (
    <div className="mt-2 lg:mt-0 p-4 lg:p-0">
      <h4 className="text-2xl lg:text-lg font-bold lg:font-normal border-b pb-2 mb-1 border-pink">
        Topics
      </h4>
      {data?.map((item) => {
        return (
          <div
            className="my-5 pb-2 lg:pb-0 lg:my-1 lg:border-none border-b border-pink border-opacity-50"
            key={item.id}
          >
            <button
              onClick={() => {
                router.push(`/topic/${item.id}`);
              }}
              type="button"
            >
              <p
                className={`text-lg hover:text-pink duration-300  lg:text-sm lg:font-thin ${
                  pathname === `/topic/${item.id}` && 'text-pink'
                }`}
              >
                {item.topicsName}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Topics;
