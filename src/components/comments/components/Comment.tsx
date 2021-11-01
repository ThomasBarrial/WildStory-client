import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { comment, user } from '../../../API/request';
import { useUserFromStore } from '../../../store/user.slice';

interface IProps {
  item: IComments;
}

function Comment({ item }: IProps): JSX.Element {
  const queryclient = useQueryClient();
  const { mutate } = useMutation(() => comment.delete(item.id), {
    onSuccess: () => {
      queryclient.refetchQueries(['getComments']);
    },
  });

  const { data: userData } = useQuery<IUser, AxiosError>('Oneuser', () =>
    user.getOne(item.userId)
  );

  const { user: userFromStore } = useUserFromStore();

  const idUser = userFromStore.id;
  return (
    <div className="flex my-5 border-b border-pink pb-3">
      <div
        className="h-12 w-12 rounded-full border border-white"
        style={{
          backgroundImage: `url(${userData?.avatarUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div className="ml-4 w-10/12">
        <p className="text-sm">{userData?.username}</p>
        <p className="text-sm">{item.text}</p>
        {item.userId === idUser && (
          <button
            className="text-xl h-3 flex items-end w-full justify-end"
            onClick={() => mutate()}
            type="button"
          >
            ...
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
