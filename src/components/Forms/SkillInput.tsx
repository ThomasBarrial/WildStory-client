/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  skillsData: ISkills[] | undefined;
}

function SkillInput({ register, skillsData }: IProps): JSX.Element {
  return (
    <div>
      <label className="font-bold font-lexend" htmlFor="Foramtions">
        Select your Skills
        <select
          className="bg-black w-full mt-2 h-12 p-3 rounded-none border"
          {...register('skillId')}
        >
          {skillsData?.map((item) => {
            return (
              <option className="py-2" key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </label>
      <label
        className="font-bold font-lexend flex items-center justify-between mt-2"
        htmlFor="note"
      >
        Rate your skill between 0 and 10
        <input
          {...register('note')}
          className="ml-5 w-1/6 bg-black mt-2 border rounded-none focus:outline-none p-2 border-white"
          type="number"
          min="0"
          max="10"
          defaultValue={0}
        />
      </label>
    </div>
  );
}

export default SkillInput;
