import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Switch, useLocation, useHistory, useParams } from 'react-router-dom';
import { auth } from '../API/request';
import MobileNavBar from '../components/navbar/MobileNavBar';
import Navabar from '../components/navbar/Navabar';
import SideBarDesktop from '../components/sidebar/SideBarDesktop';
import SidebarMobile from '../components/sidebar/SidebarMobile';
import Routes from '../router';
import { useUserFromStore } from '../store/user.slice';

function Layout(): JSX.Element {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();
  const { dispatchLogin } = useUserFromStore();
  const [isSidebar, setIsSideBar] = useState(false);

  // ON THE REFRESH OF THE PAGE WHE CHECK IF THE USER WAS LOG OR NOT
  // IF THE USER WAS LOG WE REDISPATCH THE USER'S DATA IN REDUX
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
    <div className=" w-screen min-h-screen bg-black flex pb-3 lg:pb-2 font-lexend text-white  md:w-12/12 max-w-6xl md:mx-auto">
      <Navabar setIsSideBar={setIsSideBar} />

      <div className="pt-14 lg:pt-12 w-full lg:w-feed lg:pl-5">
        <Switch>
          <Routes />
        </Switch>{' '}
      </div>
      <SidebarMobile isSidebar={isSidebar} setIsSideBar={setIsSideBar} />
      <SideBarDesktop setIsSideBar={setIsSideBar} />
      <MobileNavBar />
    </div>
  );
}

export default Layout;
