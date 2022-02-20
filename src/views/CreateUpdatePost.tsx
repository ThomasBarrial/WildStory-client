import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import back from '../assets/icons/back.svg';
import TextArea from '../components/formComponents/TextArea';
import { useUserFromStore } from '../store/user.slice';
import { post } from '../API/request';
import UploadImages from '../components/post/UploadImages';
import SelectTopics from '../components/formComponents/SelectTopics';
import Error404 from '../components/errors/Error404';

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

  const router = useHistory();

  // FETCH THE POST'S DATA (ONLY IF POSTID IS DEFINED)
  const { isLoading: postLoading, isError: postError } = useQuery<IPost>(
    ['post', postId],
    () => post.getOne(postId as string),
    {
      enabled: Boolean(postId),
      onSuccess: (data) => {
        setUploadImages(data.imageUrl);
        setValue('topicsId', data.topicsId);
        setValue('text', data.text);
      },
    }
  );

  // CREATE A NEW POST
  const {
    mutateAsync: createData,
    isLoading: createPostLoading,
    isError: createPostError,
  } = useMutation(post.post, {
    onSuccess: () => {
      toast('Story successfully created');
      router.push('/');
    },
  });

  // UPDATE THE CURRENT POST (ONLY IF ID IN THE ROUTPATH)
  const {
    mutateAsync: editData,
    isError: updatePostError,
    isLoading: updatePostLoading,
  } = useMutation(post.put, {
    onSuccess: () => {
      toast('your story has been successfully edited');
      router.push(`/comments/${postId}`);
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

  if (postLoading || createPostLoading || updatePostLoading) {
    return <p className="text-pink animate-pulse pt-10">...Loading</p>;
  }
  if (postError || createPostError || updatePostError) {
    return <Error404 />;
  }

  return (
    <div className="text-white w-full   lg:bg-dark lg:p-10 lg:my-5  my-10 rounded-md px-4 pb-20 ">
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
          className="mt-5 border rounded-sm border-pink bg-pink bg-opacity-0 text-pink py-2 w-6/12 transform hover:scale-105 hover:bg-opacity-100 hover:text-black duration-500"
        >
          {postId ? 'Edit your post' : 'Create post'}
        </button>
      </form>
    </div>
  );
}

export default CreateUpdatePost;
