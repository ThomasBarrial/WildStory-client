import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import settings from '../../assets/icons/settings.svg';
import home from '../../assets/icons/home.svg';
import newpost from '../../assets/icons/newpost.svg';
import { useUserFromStore } from '../../store/user.slice';

function Navabar(): JSX.Element {
  const { user } = useUserFromStore();
  const icons = [
    { path: '/', icon: home, alt: 'home' },
    { path: '/newpost', icon: newpost, alt: 'newpost' },
    { path: '/settings', icon: settings, alt: 'settings' },
  ];
  return (
    <div className="w-screen flex justify-between items-center h-16 px-4 pt-2">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="flex h-full items-center">
        {icons.map((item) => {
          return (
            <Link className="mx-2" key={item.path} to={item.path}>
              <img
                className="h-6 w-6 cursor-pointer"
                src={item.icon}
                alt={item.alt}
              />
            </Link>
          );
        })}
        <Link to="/profil">
          <img
            className="h-10 w-10 ml-2 cursor-pointer rounded-full border border-black"
            src={user.avatarUrl}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}

export default Navabar;
