import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { auth } from '../API/request';
import { useUserFromStore } from '../store/user.slice';

function Logout(): JSX.Element | null {
  const { dispatchLogout } = useUserFromStore();
  const history = useHistory();
  const { isLoading, error } = useQuery<{ message: string }, AxiosError>(
    'auth',
    auth.logout,
    {
      onSuccess: () => {
        dispatchLogout();
        history.push('/login');
      },
    }
  );

  if (isLoading) {
    return <p>...Loading</p>;
  }

  if (error) {
    return (
      <p>
        Error message: {error.message}. Error code: {error.code}
      </p>
    );
  }

  return null;
}

export default Logout;
