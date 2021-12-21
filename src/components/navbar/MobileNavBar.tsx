import React from 'react';
import { Link } from 'react-router-dom';
import { useUserFromStore } from '../../store/user.slice';
import settings from '../../assets/icons/settings.svg';
import home from '../../assets/icons/home.svg';
import newpost from '../../assets/icons/newpost.svg';
import search from '../../assets/icons/search.svg';

function MobileNavBar(): JSX.Element {
  const { user } = useUserFromStore();
  const icons = [
    { path: '/', icon: home, alt: 'home' },
    { path: '/newpost', icon: newpost, alt: 'newpost' },
    { path: `/settings/${user.id}`, icon: settings, alt: 'settings' },
    { path: `/search`, icon: search, alt: 'search' },
  ];
  return (
    <div className="lg:hidden fixed bottom-0 w-full z-30 flex items-center justify-center bg-black border-t border-pink h-20">
      <div className="flex lg:hidden">
        {icons.map((item) => {
          return (
            <Link className="mx-8" key={item.path} to={item.path}>
              <img
                className="h-6 w-6 cursor-pointer"
                src={item.icon}
                alt={item.alt}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNavBar;
