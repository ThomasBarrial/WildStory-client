import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo3.png';
import { useUserFromStore } from '../../store/user.slice';
import defaultAvatar from '../../assets/defaultAvatar.png';
import NavIcons from './components/NavIcons';
import MobileIcons from './components/MobileIcons';

function Navabar(): JSX.Element {
  const { user } = useUserFromStore();

  return (
    <div className="w-full left-0  flex justify-center fixed z-50 bg-black items-center px-4 py-5 lg:py-3">
      <div className="flex  max-w-6xl justify-between w-full lg:justify-between items-center">
        <Link className="flex w-4/12 md:w-28 lg:w-32" to="/">
          <img src={logo} alt="logo" />
        </Link>
        {user.logged === false ? (
          <div>
            <Link
              className="border mx-2 py-2 px-4 font-thin text-sm text-white hover:border-pink hover:text-pink rounded-sm"
              to="/login"
            >
              SignIn
            </Link>
            <Link
              className="border ml-2 py-2 px-4 font-thin text-sm text-white hover:border-pink hover:text-pink rounded-sm"
              to="/signup"
            >
              SignUp
            </Link>
          </div>
        ) : (
          <div className=" flex h-full items-center ">
            {/* ONLY ON DESKTOP */}
            <NavIcons />
            {/* ONLY ON MOBILE */}
            <MobileIcons />
            <Link to={`/profil/${user.id}`}>
              <div
                className="h-10 w-10 ml-2 cursor-pointer rounded-full border border-pink"
                style={{
                  backgroundImage: `url(${
                    user.avatarUrl === null || user.avatarUrl === undefined
                      ? defaultAvatar
                      : user.avatarUrl
                  })`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navabar;
