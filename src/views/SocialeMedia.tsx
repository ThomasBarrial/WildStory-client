/* eslint-disable react/jsx-props-no-spreading */
import { AxiosError } from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mediaIcons, mediaLinks } from '../API/request';
import TextInput from '../components/formComponents/TextInput';
import MediaLink from '../components/user/MediaLink';
import { useUserFromStore } from '../store/user.slice';
import ErrorPageToast from '../components/errors/ErrorToast';

function SocialeMedia(): JSX.Element {
  const { id }: { id: string } = useParams();
  const queryclient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { user: userStore } = useUserFromStore();

  // FETCH ALL ICONS
  const {
    data: icons,
    isLoading,
    isError,
  } = useQuery<IMediaIcon[], AxiosError>(['mediaicons'], () =>
    mediaIcons.getAll()
  );

  // FETCH USER'S MEDIALINKS
  const {
    data: Medialinks,
    isLoading: LoadMedLi,
    isError: ErrMedLi,
  } = useQuery<IMediaLink[], AxiosError>(['mediaLinks', id], () =>
    mediaLinks.getUsersMediaLink(id)
  );

  // CREATE MEDIALINKS
  const {
    mutateAsync: createData,
    error: postError,
    isLoading: postLoading,
  } = useMutation(mediaLinks.post, {
    onSuccess: () => {
      queryclient.refetchQueries(['mediaLinks']);
    },
  });

  const onSubmit: SubmitHandler<IMediaLink> = (data: IMediaLink) => {
    // CHECK IF THE LINK WAS NOT ALREADY ADD
    const mediafilter = Medialinks?.filter((item) => item.link === data.link);

    // CREATE THE BOBY'S DATA
    const medialLinkData = {
      link: data.link,
      iconId: data.iconId,
      userId: id,
    };

    //  IF THE LINK WAS ALREADY ADD OPEN POPUP ERROR ESLE WE CREATE THE MEDIALINK
    if (mediafilter?.length !== 0) {
      toast(
        ' You already have this media ! If you want to update it delete the  media before'
      );
    } else {
      createData({ medialLinkData });
    }
  };

  if (isLoading || LoadMedLi || postLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (isError || ErrMedLi) {
    return (
      <div className="pt-10">
        <ErrorPageToast />
      </div>
    );
  }
  if (postError) {
    toast(<ErrorPageToast />);
  }
  return (
    <div className="pt-5">
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
        <div className="flex flex-col items-center lg:items-end mt-7 justify-between">
          <button
            className="font-bold rounded-sm font-lexend w-full lg:w-3/12 p-2 text-black  border border-pink bg-pink transform  hover:scale-90  duration-300"
            type="submit"
          >
            Add social link
          </button>
          <Link to={`/profil/${userStore.id}`}>
            <p className="font-bold font-lexend  rounded-sm w-full text-center  mt-5 lg:mt-5 lg:w-80 p-2  border border-pink text-pink transform hover:scale-95 bg-pink bg-opacity-0 duration-300 ">
              Done
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SocialeMedia;
