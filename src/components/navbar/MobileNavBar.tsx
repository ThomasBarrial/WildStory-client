import React from 'react';
import { Link } from 'react-router-dom';
import home from '../../assets/icons/home.svg';
import search from '../../assets/icons/search.svg';
import formations from '../../assets/icons/formations.svg';
import topics from '../../assets/icons/Topics.svg';

function MobileNavBar(): JSX.Element {
  const icons = [
    { path: '/', icon: home, alt: 'home' },
    { path: `/search`, icon: search, alt: 'search' },
    { path: `/formations`, icon: formations, alt: 'formations' },
    { path: `/topics`, icon: topics, alt: 'topics' },
  ];
  return (
    <div className="lg:hidden fixed bottom-0 w-full z-30 flex items-center justify-center bg-black h-20">
      <div className="flex lg:hidden">
        {icons.map((item) => {
          return (
            <Link
              className="mx-9 md:mx-12 flex flex-col items-center"
              key={item.path}
              to={item.path}
            >
              <img
                className="h-6 cursor-pointer"
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
