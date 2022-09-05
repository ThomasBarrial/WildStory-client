import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { user } from '../API/request';
import search from '../assets/icons/search.svg';
import AvatarUser from '../components/post/AvatarUser';

function Search(): JSX.Element {
  const [filteredData, setFilteredData] = useState<IUser[] | undefined>([]);
  const [inputValue, setInputValue] = useState('');
  const { data, isLoading, error } = useQuery<IUser[], AxiosError>(
    ['getAllUsers'],
    () => user.getAll()
  );
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }

  const handleFilter = (searchName: string) => {
    setInputValue(searchName);
    const newFilter = data?.filter((value) => {
      return value.username.toLowerCase().includes(searchName.toLowerCase());
    });

    if (searchName === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="p-4 mt-5 lg:bg-dark rounded-md">
      <div className="flex items-center">
        <img className="h-5 w-5" src={search} alt="" />
        <p className="font-bold text-pink ml-2">
          Are you looking for a wilder ?
        </p>
      </div>
      <input
        type="text"
        className="bg-black w-full mt-5 border rounded-md focus:outline-none p-2 border-white"
        onChange={(e) => handleFilter(e.target.value)}
      />
      <div className=" lg:p-4 lg:rounded-md mt-5">
        {inputValue === '' ? (
          <div>
            {data.map((item) => {
              return (
                <div key={item.id} className="border-b border-lowBorder my-4">
                  <AvatarUser userId={item.id} />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {filteredData?.map((item) => {
              return (
                <div key={item.id} className="border-b border-lowBorder my-4">
                  <AvatarUser userId={item.id} />
                </div>
              );
            })}
            {filteredData?.length === 0 && (
              <p className="text-pink text-sm">
                Wilder not found.. try with a other username
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
