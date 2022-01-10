import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SocialeMedia from './views/SocialeMedia';
import Comments from './views/Comments';
import CreateUpdatePost from './views/CreateUpdatePost';
import CreateUpdateUser from './views/CreateUpdateUser';
import ListPost from './views/ListPost';
import UserProfil from './views/UserProfil';
import UserSkills from './views/UserSkills';
import LogIn from './views/LogIn';
import AssetSettings from './components/user/AssetsUser/AssetSettings';
import Logout from './views/Logout';
import OneTopic from './views/OneTopic';
import OneFormation from './views/OneFormation';
import Formations from './components/sidebar/Components/Formations';
import Topics from './components/sidebar/Components/Topics';
import Search from './views/Search';
import { useUserFromStore } from './store/user.slice';
import Error404 from './components/errors/Error404';

function Routes(): JSX.Element {
  const { user } = useUserFromStore();
  return (
    <>
      {!user.logged ? (
        <div>
          <Route exact path="/" component={ListPost} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={CreateUpdateUser} />
          <Route exact path="/profil/:id" component={UserProfil} />
          <Route exact path="/comments/:id" component={Comments} />
          <Route exact path="/userskills/:id" component={UserSkills} />
          <Route exact path="/formations" component={Formations} />
          <Route exact path="/formation/:id" component={OneFormation} />
          <Route exact path="/topic/:id" component={OneTopic} />
          <Route exact path="/topics" component={Topics} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/404" component={Error404} />
          <Redirect to="/404" />
        </div>
      ) : (
        <div>
          <Route exact path="/" component={ListPost} />
          <Route exact path="/newpost" component={CreateUpdatePost} />
          <Route exact path="/editpost/:id" component={CreateUpdatePost} />
          <Route exact path="/settings/:id" component={CreateUpdateUser} />
          <Route exact path="/profil/:id" component={UserProfil} />
          <Route exact path="/comments/:id" component={Comments} />
          <Route exact path="/userassets/:id" component={AssetSettings} />
          <Route exact path="/userskills/:id" component={UserSkills} />
          <Route exact path="/edituserskills/:id" component={UserSkills} />
          <Route exact path="/editsocialmedia/:id" component={SocialeMedia} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/formations" component={Formations} />
          <Route exact path="/formation/:id" component={OneFormation} />
          <Route exact path="/topic/:id" component={OneTopic} />
          <Route exact path="/topics" component={Topics} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/404" component={Error404} />
          <Redirect to="/404" />
        </div>
      )}
    </>
  );
}

export default Routes;
