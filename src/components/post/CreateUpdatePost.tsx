import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
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
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useUserFromStore();
  const IdUserFormStore = user.id;
  const { isModal, setIsModal, message, setMessage } = useModal();
  const router = useHistory();

  const { mutateAsync: postData, error: postError } = useMutation(post.post, {
    onSuccess: () => {
      setIsModal(true);
      setMessage('Your post as been created');
    },
  });

  const onSubmit = (formData: IFormData) => {
    const createData = {
      title: formData.title,
      text: formData.text,
      userId: IdUserFormStore,
      imageUrl: uploadImages,
    };
    return postData({ createData });
  };

  const error = postError;
  return (
    <div className="text-white lg:w-6/12 mx-auto mt-10 px-4 pb-10 lg:px-0">
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
      <div className="flex w-full justify-between">
        <Link to="/">
          <img src={back} alt="goBack" />
        </Link>
        <h3 className="text-base">Nouvelle Publication</h3>
      </div>
      <UploadImages
        setUploadImages={setUploadImages}
        uploadImages={uploadImages}
      />
      <form onSubmit={handleSubmit(onSubmit)} action="Create/Update Post">
        <TextInput
          label="Post title"
          placeholder="title..."
          register={register}
          name="title"
          required={false}
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
          className="mt-5 border border-pink text-pink py-2 w-6/12"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreateUpdatePost;
