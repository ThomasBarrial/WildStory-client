/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { mediaIcons, mediaLinks } from '../API/request';
import useModal from '../hook/useModal';
import HeaderUser from '../components/formComponents/HeaderUser';
import TextInput from '../components/formComponents/TextInput';
import Modal from '../components/modal/Modal';
import MediaLink from '../components/user/MediaLink';
import { useUserFromStore } from '../store/user.slice';

function SocialeMedia(): JSX.Element {
  const router = useHistory();
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
    <div className="w-sreen pt-14  h-screen pb-20 bg-black fixed inset-0 z-50 overflow-y-scroll">
      {isModal && (
        <Modal
          title="Ouups"
          buttons={[{ text: 'ok', handleClick: () => setIsModal(false) }]}
        >
          {message}
        </Modal>
      )}
      <HeaderUser
        userUpdateid={id}
        title={
          pathname === `/editsocialmedia/${userStore.id}`
            ? 'Edit your socials links'
            : 'Add sociale link'
        }
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 lg:w-8/12 lg:mx-auto"
        action="getUserSocialLinks"
      >
        {Medialinks?.map((item) => {
          return <MediaLink isForm item={item} />;
        })}
        <label className="font-bold font-lexend" htmlFor="Foramtions">
          Select Social Media
          <select
            className="bg-black w-full mt-2 h-12 p-  border"
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
            className=" p-2 w-full rounded-md lg:w-3/12  mt-5 bg-pink"
            type="submit"
          >
            Add sociale link
          </button>
          {pathname === `/editsocialmedia/${userStore.id}` ? (
            <Link to={`/profil/${userStore.id}`}>
              <p className="font-bold font-lexend w-full text-center  mt-5 lg:mt-0 lg:w-80 p-2  bg-pink">
                Done
              </p>
            </Link>
          ) : (
            <div>
              {Medialinks?.length === 0 ? (
                <button
                  type="button"
                  onClick={() => router.push(`/`)}
                  className="font-bold rounded-md text-right font-lexend mt-3 lg:mt-0 w-full lg:w-12/12  underline"
                >
                  Skip this step
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/`)}
                  className="font-bold rounded-md font-lexend w-full  mt-5 lg:mt-0 lg:w-12/12 p-2 px-10  bg-pink"
                  type="submit"
                >
                  next
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SocialeMedia;