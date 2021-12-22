import React from 'react';
import { useQuery } from 'react-query';
import { Switch, useLocation, useHistory, useParams } from 'react-router-dom';
import { auth } from '../API/request';
import MobileNavBar from '../components/navbar/MobileNavBar';
import Navabar from '../components/navbar/Navabar';
import Sidebar from '../components/sidebar/Sidebar';
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
      if (pathname !== '/signup' && id === undefined) {
        history.push('/login');
      }
    },
  });

  if (isLoading) return <p>...Loading</p>;

  return (
    <div className=" w-screen bg-black flex pb-3 lg:pb-2 font-lexend text-white  md:w-12/12 max-w-6xl md:mx-auto">
      <Navabar />

      <div className="pt-14 lg:pt-12 w-full lg:pl-5">
        <Switch>
          <Routes />
        </Switch>{' '}
      </div>
      <Sidebar />
      <MobileNavBar />
    </div>
  );
}

export default Layout;
