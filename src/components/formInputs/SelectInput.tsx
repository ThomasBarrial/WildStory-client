/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  formationData: IFormation[] | undefined;
  name: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
}

function SelectInput({
  formationData,
  name,
  id,
  register,
  required,
}: IProps): JSX.Element {
  return (
    <label className="font-bold font-lexend" htmlFor="Foramtions">
      Select your actual or old formation
      <select
        className="bg-black w-full mt-2 h-12 p-3 rounded-none border"
        {...register(name, { required })}
        id={id}
      >
        {formationData?.map((f) => {
          return (
            <option className="py-2" key={f.id} value={f.id}>
              {f.formationName}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default SelectInput;
