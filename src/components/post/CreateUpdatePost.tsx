import React, { useState } from 'react';
import back from '../../assets/icons/back.svg';
import UploadImages from './components/UploadImages';

function CreateUpdatePost(): JSX.Element {
  const [uploadImages, setUploadImages] = useState<string[]>([]);

  return (
    <div className="text-white lg:w-6/12 mx-auto mt-10 px-4 pb-10 lg:px-0">
      <div className="flex w-full justify-between">
        <img src={back} alt="goBack" />
        <h3 className="text-base">Nouvelle Publication</h3>
      </div>
      <UploadImages
        setUploadImages={setUploadImages}
        uploadImages={uploadImages}
      />
    </div>
  );
}

export default CreateUpdatePost;
