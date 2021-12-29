import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { formation } from '../../../API/request';

interface IProps {
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
}

function Formations({ setIsSideBar }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<IFormation[]>(
    ['getAllFormations'],
    () => formation.getAll()
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
      <h4 className="text-lg  border-b pb-2 mb-3 border-pink">Formations</h4>
      {data.map((item) => {
        return (
          <div className="my-2" key={item.id}>
            <button
              onClick={() => {
                router.push(`/formation/${item.id}`);
                setIsSideBar(false);
              }}
              type="button"
            >
              {item.formationName}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Formations;
