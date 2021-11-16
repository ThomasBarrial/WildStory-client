import React, { useState } from 'react';
import { useParams } from 'react-router';
// import { useUserFromStore } from '../store/user.slice';
import { useForm } from 'react-hook-form';
import HeaderSettings from '../components/user/headerSettings/HeaderSettings';
import tlc from '../assets/trc.webp';
import logo from '../assets/WildStory.webp';
import TextInput from '../components/Forms/TextInput';

function CreateUpdateUser(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  // const { user: userFromStore } = useUserFromStore();
  const [landingUrl, setLandingUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const { register } = useForm();
  console.log(id);

  return (
    <div className="w-sreen h-screen bg-black fixed inset-0 z-50 overflow-y-scroll">
      <img className="absolute -top-3 right-0" src={tlc} alt="." />
      <div className="my-14">
        <div className="mx-4">
          <img className="h-10" src={logo} alt="WildStory" />
          <h3 className="mt-5">welcome on the wilders community !!!</h3>
          <h2 className="font-bold mb-5 mt-2">Create your profil</h2>
        </div>
        <HeaderSettings
          userAvatar={avatarUrl}
          userLanding={landingUrl}
          setLandingUrl={setLandingUrl}
          setAvatarUrl={setAvatarUrl}
        />
        <form
          action="Create/Update Post"
          className="mx-4 mb-20 transform -translate-y-10"
        >
          <TextInput
            label="Username"
            name="Username..."
            placeholder="Username..."
            register={register}
            required
            error=""
            id="username"
          />
          <TextInput
            label="ProfilTitle"
            name="ProfilTitle"
            placeholder="ProfilTitle..."
            register={register}
            required
            error=""
            id="ProfilTitle"
          />
          <TextInput
            label="Email"
            name="Email"
            placeholder="Email..."
            register={register}
            required
            error=""
            id="Email"
          />
          <TextInput
            label="City"
            name="City"
            placeholder="City..."
            register={register}
            required
            error=""
            id="City"
          />
        </form>
      </div>
    </div>
  );
}

export default CreateUpdateUser;
