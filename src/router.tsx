import React from 'react';
import { Route } from 'react-router-dom';
import SocialeMedia from './views/SocialeMedia';
import Comments from './views/Comments';
import CreateUpdatePost from './views/CreateUpdatePost';
import CreateUpdateUser from './views/CreateUpdateUser';
import ListPost from './views/ListPost';
import UserProfil from './views/UserProfil';
import UserSkills from './views/UserSkills';
import LogIn from './views/LogIn';
import AssetSettings from './components/user/AssetsUser/AssetSettings';

function Routes(): JSX.Element {
  return (
    <>
      <Route exact path="/" component={ListPost} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/newpost" component={CreateUpdatePost} />
      <Route exact path="/editpost/:id" component={CreateUpdatePost} />
      <Route exact path="/settings/:id" component={CreateUpdateUser} />
      <Route exact path="/signup" component={CreateUpdateUser} />
      <Route exact path="/profil/:id" component={UserProfil} />
      <Route exact path="/comments/:id" component={Comments} />
      <Route exact path="/userassets/:id" component={AssetSettings} />
      <Route exact path="/createuserskills/:id" component={UserSkills} />
      <Route exact path="/socialmedia/:id" component={SocialeMedia} />
    </>
  );
}

export default Routes;
