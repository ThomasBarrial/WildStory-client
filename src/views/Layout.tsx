import React from 'react';
import { useQuery } from 'react-query';
import { Switch, useLocation, useHistory, useParams } from 'react-router-dom';
import { auth } from '../API/request';
import Navabar from '../components/navbar/Navabar';
import Routes from '../router';
import { useUserFromStore } from '../store/user.slice';

function Layout(): JSX.Element {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();
  const { dispatchLogin } = useUserFromStore();

  const { isLoading } = useQuery<IUser>('userAuthenticated', () => auth.me(), {
    retry: false,
    onSuccess: (data) => {
      dispatchLogin(data);

      history.push(pathname, search);
    },
    onError: () => {
      if (pathname !== '/signup' && id) {
        history.push('/login');
      }
    },
  });

  if (isLoading) return <p>...Loading</p>;

  return (
    <div className="h-full w-screen fixed bg-pink flex flex-col pb-3 lg:pb-2 font-lexend text-white">
      <Navabar />

      <div className="bg-black h-full rounded-3xl overflow-y-scroll">
        <Switch>
          <Routes />
        </Switch>{' '}
      </div>
    </div>
  );
}

export default Layout;
