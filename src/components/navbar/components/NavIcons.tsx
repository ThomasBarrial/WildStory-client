import React from 'react';
import { Link } from 'react-router-dom';
import settings from '../../../assets/icons/settings.svg';
import home from '../../../assets/icons/home.svg';
import newpost from '../../../assets/icons/newpost.svg';
import search from '../../../assets/icons/search.svg';
import { useUserFromStore } from '../../../store/user.slice';
import messages from '../../../assets/icons/messages.svg';

function NavIcons(): JSX.Element {
  const { user } = useUserFromStore();
  const icons = [
    { path: '/', icon: home, alt: 'home' },
    { path: '/messenger', icon: messages, alt: 'messages' },
    { path: `/search`, icon: search, alt: 'search' },
    { path: '/newpost', icon: newpost, alt: 'newpost' },
    { path: `/settings/${user.id}`, icon: settings, alt: 'settings' },
  ];
  return (
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
  );
}

export default NavIcons;
