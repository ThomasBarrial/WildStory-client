import { Dispatch, SetStateAction, useState } from 'react';

interface Return {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

function useModal(): Return {
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState<string>('');

  return { isModal, setIsModal, message, setMessage };
}

export default useModal;
