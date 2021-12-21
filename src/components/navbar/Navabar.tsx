import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo3.png';
import settings from '../../assets/icons/settings.svg';
import home from '../../assets/icons/home.svg';
import newpost from '../../assets/icons/newpost.svg';
import { useUserFromStore } from '../../store/user.slice';

function Navabar(): JSX.Element {
  const { user } = useUserFromStore();
  const icons = [
    { path: '/', icon: home, alt: 'home' },
    { path: '/newpost', icon: newpost, alt: 'newpost' },
    { path: `/settings/${user.id}`, icon: settings, alt: 'settings' },
  ];
  return (
    <div className="w-full  max-w-6xl flex justify-between fixed z-50 bg-black items-center border-b lg:border-none  border-pink  px-4 py-4 lg:py-3">
      <div className="lg:hidden  flex flex-col">
        <span className="h-span my-span w-7 bg-pink" />
        <span className="h-span my-span w-7 bg-pink" />
        <span className="h-span my-span w-7 bg-pink" />
      </div>
      <div className="flex lg:w-full justify-end lg:justify-between items-center">
        <Link className="w-5/12 flex lg:w-32" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className=" flex h-full items-center ">
          <div className="hidden lg:flex">
            {icons.map((item) => {
              return (
                <Link className="mx-2" key={item.path} to={item.path}>
                  <img
                    className="h-5 w-5 cursor-pointer"
                    src={item.icon}
                    alt={item.alt}
                  />
                </Link>
              );
            })}
          </div>
          <Link to={`/profil/${user.id}`}>
            <div
              className="h-10 w-10 ml-2 cursor-pointer rounded-full border border-pink"
              style={{
                backgroundImage: `url(${user.avatarUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navabar;
