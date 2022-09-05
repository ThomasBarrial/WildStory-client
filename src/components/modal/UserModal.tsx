/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { user } from '../../API/request';
import cross from '../../assets/icons/close.svg';
import { useUserFromStore } from '../../store/user.slice';
import defaultAvatar from '../../assets/defaultAvatar.png';
import defaultLanding from '../../assets/defaultLanding.png';
import ErrorPageToast from '../errors/ErrorToast';

interface IProps {
  isOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
}

function UserModal({ isOpen, label }: IProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { user: userFromStore, dispatchUser } = useUserFromStore();
  const queryclient = useQueryClient();
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [deleteToken, setDeleteToken] = useState('');
  const [UserData, setUserData] = useState({});
  const [preview, setPreview] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [defaultImage, setDefaultImage] = useState<string | undefined>('');

  const formData = new FormData();

  // ON THE COMPONENT DID MOUNT WE SET DEFAULT IMAGE IN FUNCTION OF THE LABEL
  useEffect(() => {
    if (label === 'avatar') {
      // IF THE USER D'ONT HAVE ANY ASSETS SET THE DEFAULT ONE
      if (userFromStore.avatarUrl === null || undefined) {
        setDefaultImage(defaultAvatar);
      } else {
        setDefaultImage(userFromStore.avatarUrl);
      }
    }
    if (label === 'landing') {
      // IF THE USER D'ONT HAVE ANY ASSETS SET THE DEFAULT ONE

      if (userFromStore.landimageUrl === undefined || null) {
        setDefaultImage(defaultLanding);
      } else {
        setDefaultImage(userFromStore.landimageUrl);
      }
    }
  }, []);

  // EDIT USER ON THE OK BUTTON CLICK WITH THE LINK FROM CLOUDINARY
  const {
    mutateAsync: editeData,
    isLoading,
    error: putError,
  } = useMutation('userUpdate', user.put, {
    onSuccess: (d) => {
      dispatchUser(d);
      // WE CLOSE THE MODAL
      isOpen(false);
      // REFETCH THE USER'S DATA
      queryclient.refetchQueries(['oneUser']);
    },
  });
  const OnClick = () => {
    return editeData({ UserData, id });
  };

  // ON CLICK CLANCEL DELETE THE IMAGE FROM THE CLOUDINARY LYBRARY
  const handleDeleteImage = async () => {
    if (isFileSelected) {
      const deleteBody = {
        token: deleteToken,
      };
      await axios.post(
        'https://api.cloudinary.com/v1_1/dyxboy0zg/delete_by_token',
        deleteBody
      );
    }
    // WE CLOSE THE MODAL
    isOpen(false);
  };

  // ON CHANGE OF THE FILE INPUT WE POST THE IMAGE ON CLOUDINARY
  const handleImageSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // ACTIVATE THE LOADER
    setLoading(true);
    // SET THE NEW FORM DATA VALUE WITH CLOUDINARY BODY AND PRESETS
    formData.append('file', e.target.files?.[0] as File);
    formData.append('upload_preset', 'myUploads');
    // POST THE IMAGE ON CLOUDINARY API
    await axios
      .post('https://api.cloudinary.com/v1_1/dyxboy0zg/image/upload', formData)
      .then((res) => {
        // GET THE DELETE_TOKEN DATA WE USE FOR THE DELETE FUNCTION
        setDeleteToken(res.data.delete_token);
        // UDPATE THE USER DATA IN FUNTION OF THE LABEL
        if (label === 'avatar') {
          setUserData({
            avatarUrl: res.data.secure_url,
          });
        } else {
          setUserData({
            landimageUrl: res.data.secure_url,
          });
        }
        // SET THE PREVIEW IMAGE
        setPreview(res.data.secure_url);
        // DESACTIVATE THE LOADER
        setLoading(false);
      })
      .catch(() => setError(true));
  };

  return (
    <div className="w-screen fixed inset-0 z-50 h-full  bg-black bg-opacity-60 flex items-center justify-center">
      <form className="w-11/12 lg:w-6/12 bg-dark  rounded-md p-5 lg:p-8">
        <div className="w-full flex flex-col justify-center items-center">
          <button
            onClick={() => {
              setIsFileSelected(true);
              handleDeleteImage();
            }}
            className="w-full flex justify-end"
            type="button"
          >
            <img src={cross} alt="isOpen" />
          </button>
          <h2 className="text-xl">Update your {label} Image</h2>
          <h2 className="text-base mt-2 text-pink">
            Click on the image to change it
          </h2>
          <div
            className={`${
              label === 'avatar'
                ? 'w-52 h-52 rounded-full'
                : 'h-36 lg:h-52 w-full rounded-md'
            }  border bg-black border-pink my-5`}
            style={{
              backgroundImage: `url(${
                preview === '' ? defaultImage : preview
              })`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {Loading ||
              (isLoading && (
                <p
                  className={`text-pink animate-pulse w-full text-center mt-24  `}
                >
                  ...Loading
                </p>
              ))}
            {Error ||
              (putError && (
                <div className="p-5">
                  <ErrorPageToast />
                </div>
              ))}

            <input
              id="landing"
              type="file"
              placeholder="image..."
              defaultValue=""
              onChange={(e) => handleImageSubmit(e)}
              className={`bg-black h-52 ${
                label === 'landing' ? 'w-6/12' : 'w-2/12'
              } opacity-0  absolute cursor-pointer border rounded-md focus:outline-none p-2 border-white`}
            />
          </div>
        </div>
        <div className="mt- flex w-full items-center justify-center">
          <button
            type="button"
            onClick={() => OnClick()}
            className="border rounded-md  border-pink text-pink  py-2 w-full lg:w-4/12 transform hover:scale-95 duration-500"
          >
            ok
          </button>{' '}
        </div>
      </form>
    </div>
  );
}

export default UserModal;
