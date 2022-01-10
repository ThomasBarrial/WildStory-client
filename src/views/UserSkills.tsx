/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { skills, userSkills } from '../API/request';
import HeaderUser from '../components/formComponents/HeaderUser';
import SkillInput from '../components/formComponents/SkillInput';
import Skill from '../components/user/Skill';
import { useUserFromStore } from '../store/user.slice';
import Error404 from '../components/errors/Error404';

interface INewSkill {
  skillId: string;
  note: string;
}

function UserSkills(): JSX.Element {
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();
  const { register, handleSubmit } = useForm();

  const {
    data: skillsData,
    isLoading,
    error,
  } = useQuery<ISkills[], AxiosError>(['skills'], () => skills.getAll());

  const {
    mutateAsync: createData,
    isError: postError,
    isLoading: postLoading,
  } = useMutation(userSkills.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['userSkills']);
    },
  });

  const {
    data: skill,
    isLoading: dataLoading,
    isError: dataError,
  } = useQuery<IUserSkills[], AxiosError>(['userSkills', user.id], () =>
    userSkills.getAll(user.id as string)
  );

  const onSubmit: SubmitHandler<INewSkill> = (data: INewSkill) => {
    const skillfilter = skill?.filter((item) => item.skillId === data.skillId);

    const skillData = {
      skillId: data.skillId,
      note: parseInt(data.note, 10),
      userId: user.id as string,
    };

    if (skillfilter?.length !== 0) {
      toast('You already have this skill, please delete the older one first');
    } else {
      createData({ skillData });
    }
  };

  if (isLoading || postLoading || dataLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (error || postError || dataError) {
    return <Error404 />;
  }
  return (
    <div className="py-5">
      <HeaderUser userUpdateid={undefined} title="Edit your skills" />
      {skill?.map((item) => {
        return (
          <div key={item.id}>
            <Skill isForm skill={item} />
          </div>
        );
      })}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=""
        action="getuserskills"
      >
        <SkillInput register={register} skillsData={skillsData} />
        <div className="flex flex-col items-center lg:items-end mt-7 justify-between">
          <button
            className="font-bold rounded-sm font-lexend w-full lg:w-3/12 p-2 text-black  border border-pink bg-pink transform  hover:scale-90  duration-300"
            type="submit"
          >
            Add skill
          </button>
          <Link to={`/profil/${user.id}`}>
            <p className="font-bold font-lexend  rounded-sm w-full text-center  mt-5 lg:mt-5 lg:w-80 p-2  border border-pink text-pink transform hover:scale-95 bg-pink bg-opacity-0 duration-300 ">
              Done
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserSkills;
