/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { skills, userSkills } from '../API/request';
import HeaderUser from '../components/formComponents/HeaderUser';
import SkillInput from '../components/formComponents/SkillInput';
import Skill from '../components/user/Skill';
import useModal from '../hook/useModal';
import Modal from '../components/modal/Modal';
import { useUserFromStore } from '../store/user.slice';
import Loader from '../components/loader/Loader';

interface INewSkill {
  skillId: string;
  note: string;
}

function UserSkills(): JSX.Element {
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();
  const { isModal, setIsModal, message, setMessage } = useModal();
  const { register, handleSubmit } = useForm();

  const {
    data: skillsData,
    isLoading,
    error,
  } = useQuery<ISkills[], AxiosError>(['skills'], () => skills.getAll());

  const { mutateAsync: createData, error: postError } = useMutation(
    userSkills.post,
    {
      onSuccess: () => {
        queryclient.refetchQueries(['userSkills']);
      },
    }
  );

  const { data: skill } = useQuery<IUserSkills[], AxiosError>(
    ['userSkills', user.id],
    () => userSkills.getAll(user.id as string)
  );

  const onSubmit: SubmitHandler<INewSkill> = (data: INewSkill) => {
    const skillfilter = skill?.filter((item) => item.skillId === data.skillId);

    const skillData = {
      skillId: data.skillId,
      note: parseInt(data.note, 10),
      userId: user.id as string,
    };

    if (skillfilter?.length !== 0) {
      setIsModal(true);
      setMessage(
        'You already have this skill ! If you want to update it delete the skill before'
      );
    } else {
      createData({ skillData });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error || postError) {
    setIsModal(true);
    setMessage(
      'Sorry something bad happen please retry or contact a administrator'
    );
  }
  return (
    <div className="py-5">
      {isModal && (
        <Modal
          title="Ouups"
          buttons={[{ text: 'ok', handleClick: () => setIsModal(false) }]}
        >
          {message}
        </Modal>
      )}
      <HeaderUser userUpdateid={undefined} title="Edit your skills" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=""
        action="getuserskills"
      >
        {skill?.map((item) => {
          return (
            <div key={item.id}>
              <Skill isForm skill={item} />
            </div>
          );
        })}
        <SkillInput register={register} skillsData={skillsData} />
        <div className="flex items-center mt-12 justify-between">
          <button
            className="font-bold rounded-sm font-lexend w-full lg:w-3/12 p-2 text-pink  border border-pink bg-pink bg-opacity-0 hover:bg-opacity-30 duration-300"
            type="submit"
          >
            Add skill
          </button>
          <Link to={`/profil/${user.id}`}>
            <p className="font-bold font-lexend rounded-sm w-full text-center  mt-5 lg:mt-0 lg:w-80 p-2  border border-pink text-pink bg-pink bg-opacity-0 hover:bg-opacity-30 duration-300 ">
              Done
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserSkills;
