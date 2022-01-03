import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { auth } from '../API/request';
import { useUserFromStore } from '../store/user.slice';
import Loader from '../components/loader/Loader';

function Logout(): JSX.Element | null {
  const { dispatchLogout } = useUserFromStore();
  const history = useHistory();
  const { isLoading, error } = useQuery<{ message: string }, AxiosError>(
    'auth',
    auth.logout,
    {
      onSuccess: () => {
        dispatchLogout();
        history.push('/');
      },
    }
  );

  if (isLoading) {
    return <Loader />;
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
