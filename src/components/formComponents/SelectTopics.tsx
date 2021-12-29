/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useQuery } from 'react-query';
import { topics } from '../../API/request';

interface IProps {
  name: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
}

function SelectInput({ name, id, register, required }: IProps): JSX.Element {
  const { data, isLoading, error } = useQuery<ITopics[], AxiosError>(
    ['alltopics'],
    () => topics.getAll()
  );
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error || !data) {
    return <p>Error..</p>;
  }
  if (data.length === 0) return <p className="mt-10">No topics</p>;
  return (
    <label className="font-bold font-lexend" htmlFor="Foramtions">
      {`Select the post's topic`}
      <select
        className="bg-black w-full rounded-md mt-2 h-12 p-3  border"
        {...register(name, { required })}
        id={id}
      >
        {data?.map((item) => {
          return (
            <option className="py-2" key={item.id} value={item.id}>
              {item.topicsName}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default SelectInput;
