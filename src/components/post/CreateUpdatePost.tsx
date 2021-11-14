import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import back from '../../assets/icons/back.svg';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import UploadImages from './components/UploadImages';
import { useUserFromStore } from '../../store/user.slice';
import { post } from '../../API/request';
import useModal from '../../hook/useModal';
import Modal from '../modal/Modal';

interface IFormData {
  title: string;
  text: string;
}

function CreateUpdatePost(): JSX.Element {
  const { id: postId } = useParams<{ id: string | undefined }>();

  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { user } = useUserFromStore();
  const IdUserFormStore = user.id;
  const { isModal, setIsModal, message, setMessage } = useModal();
  const router = useHistory();

  useQuery<IPost>(['post', postId], () => post.getOne(postId as string), {
    enabled: Boolean(postId),
    onSuccess: (data) => {
      setUploadImages(data.imageUrl);
      setValue('title', data.title);
      setValue('text', data.text);
    },
  });

  const { mutateAsync: createData, error: postError } = useMutation(post.post, {
    onSuccess: () => {
      setIsModal(true);
      setMessage('Your post has been created');
    },
  });

  const { mutateAsync: editData, error: putError } = useMutation(post.put, {
    onSuccess: (data) => {
      setIsModal(true);
      setMessage('Your post has been edit');
      setUploadImages(data.imageUrl);
      setValue('title', data.title);
      setValue('text', data.text);
    },
  });

  const onSubmit = (formData: IFormData) => {
    const postData = {
      title: formData.title,
      text: formData.text,
      userId: IdUserFormStore,
      imageUrl: uploadImages,
    };
    if (!postId) return createData({ postData });
    return editData({ id: postId, postData });
  };

  const error = postError || putError;
  return (
    <div className="text-white lg:w-6/12 md:w-10/12 mx-auto mt-10 px-4 pb-10 lg:px-0">
      {isModal && (
        <Modal
          title="Every things geos well"
          buttons={
            !error
              ? [{ text: 'ok', handleClick: () => router.push('/') }]
              : [{ text: 'New try', handleClick: () => setIsModal(false) }]
          }
        >
          {message}
        </Modal>
      )}
      <div className="flex w-full items-center justify-between">
        <Link to="/">
          <img src={back} alt="goBack" />
        </Link>
        <h3 className="text-base font-bold">
          {postId ? 'Edit your post' : 'Create a new post'}
        </h3>
      </div>
      <UploadImages
        setUploadImages={setUploadImages}
        uploadImages={uploadImages}
      />
      <form
        className="pt-5"
        onSubmit={handleSubmit(onSubmit)}
        action="Create/Update Post"
      >
        <TextInput
          label="Post title"
          placeholder="title..."
          register={register}
          name="title"
          required
          id="title"
          error={errors.placeholder}
        />
        <TextArea
          label="Post Description"
          placeholder="description..."
          register={register}
          name="text"
          required
          id="text"
          error={errors.placeholder}
        />
        <button
          type="submit"
          className="mt-5 border border-white text-white py-2 w-6/12"
        >
          {postId ? 'Edit your post' : 'Create post'}
        </button>
      </form>
    </div>
  );
}

export default CreateUpdatePost;
