import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { topics } from '../../../API/request';

interface IProps {
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
}

function Topics({ setIsSideBar }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<ITopics[]>(['getAllTopcis'], () =>
    topics.getAll()
  );

  const router = useHistory();

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  return (
    <div>
      <h4 className="text-lg border-b pb-1 mb-1 border-pink">Topics</h4>
      {data.map((item) => {
        return (
          <div className="my-2 lg:my-1" key={item.id}>
            <button
              onClick={() => {
                router.push(`/topic/${item.id}`);
                setIsSideBar(false);
              }}
              type="button"
            >
              <p className="text-base lg:text-sm font-thin">
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
