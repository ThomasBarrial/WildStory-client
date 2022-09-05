import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { topics } from '../../../API/request';
import ErrorPageToast from '../../errors/ErrorToast';
import SidebarLoader from '../../skelotonLoaders/SideBarLoader';

function Topics(): JSX.Element {
  const { data, isLoading, error } = useQuery<ITopics[]>(['getAllTopcis'], () =>
    topics.getAll()
  );

  const { pathname } = useLocation();

  const router = useHistory();

  if (isLoading) {
    return <SidebarLoader />;
  }
  if (error || !data) {
    return <ErrorPageToast />;
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
