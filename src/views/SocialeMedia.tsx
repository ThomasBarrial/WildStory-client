/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { mediaIcons, mediaLinks } from '../API/request';
import useModal from '../hook/useModal';
import HeaderUser from '../components/formComponents/HeaderUser';
import TextInput from '../components/formComponents/TextInput';
import Modal from '../components/modal/Modal';
import MediaLink from '../components/user/MediaLink';
import { useUserFromStore } from '../store/user.slice';

function SocialeMedia(): JSX.Element {
  const { id }: { id: string } = useParams();
  const queryclient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { isModal, setIsModal, message, setMessage } = useModal();
  const { pathname } = useLocation();
  const { user: userStore } = useUserFromStore();

  const {
    data: icons,
    isLoading,
    isError,
  } = useQuery<IMediaIcon[], AxiosError>(['mediaicons'], () =>
    mediaIcons.getAll()
  );

  const {
    data: Medialinks,
    isLoading: LoadMedLi,
    isError: ErrMedLi,
  } = useQuery<IMediaLink[], AxiosError>(['mediaLinks', id], () =>
    mediaLinks.getUsersMediaLink(id)
  );

  const { mutateAsync: createData, error: postError } = useMutation(
    mediaLinks.post,
    {
      onSuccess: () => {
        queryclient.refetchQueries(['mediaLinks']);
      },
    }
  );

  const onSubmit: SubmitHandler<IMediaLink> = (data: IMediaLink) => {
    const mediafilter = Medialinks?.filter((item) => item.link === data.link);

    const medialLinkData = {
      link: data.link,
      iconId: data.iconId,
      userId: id,
    };

    if (mediafilter?.length !== 0) {
      setIsModal(true);
      setMessage(
        'You already have this media ! If you want to update it delete the media before'
      );
    } else {
      createData({ medialLinkData });
    }
  };

  if (isLoading || LoadMedLi) {
    return <p>...Loading</p>;
  }
  if (isError || postError || ErrMedLi) {
    setIsModal(true);
    setMessage(
      'Sorry something bad happen please retry or contact a web admin'
    );
  }
  return (
    <div className="pt-5">
      {isModal && (
        <Modal
          title="Ouups"
          buttons={[{ text: 'ok', handleClick: () => setIsModal(false) }]}
        >
          {message}
        </Modal>
      )}
      <HeaderUser
        userUpdateid={undefined}
        title={
          pathname === `/editsocialmedia/${userStore.id}`
            ? 'Edit your socials links'
            : 'Add sociale link'
        }
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=""
        action="getUserSocialLinks"
      >
        {Medialinks?.map((item) => {
          return <MediaLink isForm item={item} />;
        })}
        <label className="font-bold font-lexend" htmlFor="Foramtions">
          Select Social Media
          <select
            className="bg-black w-full mt-2 h-12 p-2 rounded-sm  border"
            {...register('iconId', { required: true })}
          >
            {icons?.map((item) => {
              return (
                <option className="py-2" key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <p className="text-xs text-pink mt-2">Fieds required</p>
        </label>
        <TextInput
          label="Enter url profil link"
          name="link"
          placeholder="...link"
          register={register}
          required
          error=""
          id="link"
        />
        <div className="flex flex-col lg:flex-row items-end mt-5 mb-20 justify-between">
          <button
            className=" p-2 w-full text-pink bg-pink bg-opacity-0 rounded-sm lg:w-3/12 hover:bg-opacity-30 duration-300  mt-5 border border-pink"
            type="submit"
          >
            Add sociale link
          </button>

          <Link to={`/profil/${userStore.id}`}>
            <p className="font-bold font-lexend rounded-sm w-full text-center  mt-5 lg:mt-0 lg:w-80 p-2  border border-pink text-pink bg-pink bg-opacity-0 hover:bg-opacity-30 duration-300 ">
              Done
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SocialeMedia;
