import React from 'react';
import { Route } from 'react-router-dom';
import CreateUpdatePost from './components/post/CreateUpdatePost';
import ListPost from './components/post/ListPost';
import CreateUpdateUser from './components/user/CreateUpdateUser';
import UserProfil from './components/user/UserProfil';

function Routes(): JSX.Element {
  return (
    <>
      <Route exact path="/" component={ListPost} />
      <Route exact path="/newpost" component={CreateUpdatePost} />
      <Route exact path="/settings" component={CreateUpdateUser} />
      <Route exact path="/profil" component={UserProfil} />
    </>
  );
}

export default Routes;
