import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { formation } from '../../../API/request';

function Formations(): JSX.Element {
  const { data, isLoading, error } = useQuery<IFormation[]>(
    ['getAllFormations'],
    () => formation.getAll()
  );

  const { pathname } = useLocation();

  const router = useHistory();

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  return (
    <div className="mt-2 lg:mt-0 p-4 lg:p-0">
      <h4 className="text-2xl lg:text-lg font-bold lg:font-normal border-b pb-2 mb-1 border-pink">
        Formations
      </h4>
      {data.map((item) => {
        return (
          <div
            className="my-5 pb-2 lg:pb-0 lg:my-1 lg:border-none border-b border-pink border-opacity-50"
            key={item.id}
          >
            <button
              onClick={() => {
                router.push(`/formation/${item.id}`);
              }}
              type="button"
            >
              <p
                className={`text-lg hover:text-pink duration-300  lg:text-sm lg:font-thin ${
                  pathname === `/formation/${item.id}` && 'text-pink'
                }`}
              >
                {item.formationName}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Formations;
