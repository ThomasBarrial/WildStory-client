import React, { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import edit from '../../assets/icons/edit.svg';
import { UserState, useUserFromStore } from '../../store/user.slice';
import collection from '../../assets/icons/collection.svg';
import info from '../../assets/icons/info.svg';
import recentpost from '../../assets/icons/recentpost.svg';
import savepost from '../../assets/icons/savepost.svg';
import Follow from './Follow';

interface IProps {
  userData: UserState;
  navItem: string;
  setNavItem: Dispatch<SetStateAction<string>>;
}

function Header({ userData, navItem, setNavItem }: IProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { user: userStore } = useUserFromStore();

  const navLinks = [
    {
      name: 'Recent Stories',
      state: 'RS',
      margin: 'mr-4',
      icon: recentpost,
    },
    {
      name: 'Collection',
      state: 'Collection',
      margin: 'mx-4',
      icon: collection,
    },
    {
      name: 'Informations',
      state: 'Info',
      margin: 'mx-4',
      icon: info,
    },
    {
      name: 'Saved Stories',
      state: 'SS',
      margin: 'ml-4',
      icon: savepost,
    },
  ];

  return (
    <div className="pt-5 border-b lg:bg-dark bg-black border-pink">
      <div className="w-full flex items-end mb-5">
        <div className="w-full">
          <div className="font-bold ext-2xl lg:text-2xl px-4 lg:px-7 w-full ">
            <p className="mr-5">{userData.username}</p>
          </div>
          <div className="flex flex-col-reverse lg:flex-col">
            <p className="text-sm mt-2 font-thin w-full px-4 lg:px-7">
              {userData.profilTitle}
            </p>
            <Follow id={userData.id} />
          </div>
        </div>
      </div>
      <div className="w-full  flex flex-col-reverse lg:flex-row lg:items-center justify-between">
        <div className="w-full  flex  justify-between mt-2 lg:mt-2 lg:w-9/12">
          {navLinks.map((item) => {
            return (
              <button
                key={item.name}
                onClick={() => setNavItem(item.state)}
                className={`justify-center  lg:items-start flex flex-col items-center py-4 mx-5 w-1/4 ${
                  navItem === item.state &&
                  `text-pink rounded-t-md bg-dark lg:bg-transparent`
                }`}
                type="button"
              >
                <img
                  className="flex lg:hidden  h-6 w-6 "
                  src={item.icon}
                  alt={item.name}
                />
                <p className="text-sm hidden lg:flex">{item.name}</p>
              </button>
            );
          })}
        </div>
        {id === userStore.id && (
          <Link to={`/settings/${userData.id}`}>
            <p className="text-sm w-full pl-4 my-2 lg:pr-4  lg:justify-end justify-start flex text-right underline">
              <img className="mr-2" src={edit} alt="" />
              Edit your profil
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
