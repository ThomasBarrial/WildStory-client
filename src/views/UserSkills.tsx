/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { skills, userSkills } from '../API/request';
import HeaderUser from '../components/formInputs/HeaderUser';
import SkillInput from '../components/formInputs/SkillInput';
import Skill from '../components/user/Skill';
import useModal from '../hook/useModal';
import Modal from '../components/modal/Modal';
import { useUserFromStore } from '../store/user.slice';

interface INewSkill {
  skillId: string;
  note: string;
}

function UserSkills(): JSX.Element {
  const queryclient = useQueryClient();
  const { user } = useUserFromStore();
  const { isModal, setIsModal, message, setMessage } = useModal();
  const { register, handleSubmit } = useForm();
  const router = useHistory();

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
    return <p>...Loading</p>;
  }
  if (error || postError) {
    setIsModal(true);
    setMessage(
      'Sorry something bad happen please retry or contact a web admin'
    );
  }
  return (
    <div className="w-sreen h-screen py-10 bg-black fixed inset-0 z-50 overflow-y-scroll">
      {isModal && (
        <Modal
          title="Ouups"
          buttons={[{ text: 'ok', handleClick: () => setIsModal(false) }]}
        >
          {message}
        </Modal>
      )}
      <HeaderUser title="Add your best skills" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 lg:w-8/12 lg:mx-auto"
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
        <div className="flex flex-col  items-end mt-12 justify-between">
          <button
            className="font-bold font-lexend w-full mb-10 lg:w-3/12 p-2 bg-pink"
            type="submit"
          >
            Add skill
          </button>
          {skill?.length === 0 ? (
            <button
              type="button"
              onClick={() => router.push(`/socialmedia/${user.id}`)}
              className="font-bold text-right font-lexend mt-3 lg:mt-0 w-full lg:w-3/12  underline"
            >
              Skip this step
            </button>
          ) : (
            <button
              onClick={() => router.push(`/socialmedia/${user.id}`)}
              className="font-bold font-lexend w-full  mt-5 lg:mt-0  p-2  bg-pink"
              type="submit"
            >
              next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserSkills;
