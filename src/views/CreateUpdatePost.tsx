import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import back from '../assets/icons/back.svg';
import TextArea from '../components/formComponents/TextArea';
import { useUserFromStore } from '../store/user.slice';
import { post } from '../API/request';
import useModal from '../hook/useModal';
import Modal from '../components/modal/Modal';
import UploadImages from '../components/post/UploadImages';
import SelectTopics from '../components/formComponents/SelectTopics';

interface IFormData {
  topicsId: string;
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

  // FETCH THE POST'S DATA (ONLY IF POSTID IS DEFINED)
  useQuery<IPost>(['post', postId], () => post.getOne(postId as string), {
    enabled: Boolean(postId),
    onSuccess: (data) => {
      setUploadImages(data.imageUrl);
      setValue('topicsId', data.topicsId);
      setValue('text', data.text);
    },
  });

  // CREATE A NEW POST
  const { mutateAsync: createData, error: postError } = useMutation(post.post, {
    onSuccess: () => {
      setIsModal(true);
      setMessage('Your post has been created');
    },
  });

  // UPDATE THE CURRENT POST (ONLY IF ID IN THE ROUTPATH)
  const { mutateAsync: editData, error: putError } = useMutation(post.put, {
    onSuccess: (data) => {
      setIsModal(true);
      setMessage('Your post has been edit');
      setUploadImages(data.imageUrl);
      setValue('topicsId', data.topicsId);
      setValue('text', data.text);
    },
  });

  // FUNCTION EXECUTE WHEN USER CLIQUE SUBMIT
  const onSubmit = (formData: IFormData) => {
    const postData = {
      text: formData.text,
      userId: IdUserFormStore,
      topicsId: formData.topicsId,
      imageUrl: uploadImages,
    };
    // IF THE POSTID FROM THE ROUT PATH IS UNDIFINED WE CREATE A NEW POST ELSE WE UPDATE THE CURRENT ONE
    if (!postId) return createData({ postData });
    return editData({ id: postId, postData });
  };

  const error = postError || putError;
  return (
    <div className="text-white w-full min-h-screen  mt-10 px-4 pb-20 lg:px-0">
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
        <SelectTopics
          register={register}
          name="topicsId"
          required
          id="topicsId"
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
          className="mt-5 border rounded-sm border-pink text-pink py-2 w-6/12"
        >
          {postId ? 'Edit your post' : 'Create post'}
        </button>
      </form>
    </div>
  );
}

export default CreateUpdatePost;
