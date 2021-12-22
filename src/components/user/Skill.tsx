import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { skills, userSkills } from '../../API/request';
import trash from '../../assets/icons/trash.svg';
import useModal from '../../hook/useModal';
import Modal from '../modal/Modal';

interface IProps {
  skill: IUserSkills;
  isForm: boolean;
}

function Skill({ skill, isForm }: IProps): JSX.Element {
  const { isModal, setIsModal, message, setMessage } = useModal();
  const queryclient = useQueryClient();
  const {
    data: skillData,
    error: skillDataError,
    isLoading,
  } = useQuery<ISkills, AxiosError>(['skill', skill.skillId], () =>
    skills.getOne(skill.skillId)
  );

  const { mutate, error } = useMutation(
    () => userSkills.delete(skill.id as string),
    {
      onSuccess: () => {
        queryclient.refetchQueries(['userSkills']);
      },
    }
  );

  if (error || skillDataError) {
    setIsModal(true);
    setMessage(
      'Sorry something bad happen please retry or contact a administrator'
    );
    if (isLoading) {
      return <p>...Loading</p>;
    }
  }
  return (
    <div className="flex text-sm justify-between border-b border-opacity-40 my-5 pb-2 border-pink">
      {isModal && (
        <Modal
          title="Ouups"
          buttons={[{ text: 'ok', handleClick: () => setIsModal(false) }]}
        >
          {message}
        </Modal>
      )}
      <p>{skillData?.name}</p>
      <div className="flex">
        <p>{skill.note}/10</p>
        {isForm && (
          <button
            onClick={() => mutate()}
            className="ml-5 flex items-end"
            type="button"
          >
            <img alt="delete" src={trash} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Skill;
