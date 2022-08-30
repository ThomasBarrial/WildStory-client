import React, { Dispatch, SetStateAction, useState } from 'react';
import { Dialog } from '@headlessui/react';

interface Iprops {
  title: string;
  buttons: IButton[];
  children: React.ReactNode;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

interface IButton {
  text: string;
  handleClick?: (closeModal: () => void) => void;
  backgroundColor?: string;
  textColor?: string;
}

function Modal({ title, buttons, children, setIsModal }: Iprops): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = (): void => {
    setIsOpen(false);
    setIsModal(false);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="flex bg-black font-lexend bg-opacity-80 justify-center items-center fixed inset-0"
    >
      <Dialog.Overlay className="fixed inset-0 z-50 " />

      <div className="py-10 pr-4 pl-4 md:px-7 lg:px-10 w-11/12 lg:w-6/12 flex flex-col z-50 text-white bg-dark rounded-md break-all">
        <Dialog.Title className="sm:text-xl text-base mb-1 font-bold">
          {title}
        </Dialog.Title>

        {children && <div className="text-base">{children}</div>}

        <div className="flex mt-5">
          {buttons.map((button, index) => (
            <button
              type="button"
              key={button.text}
              className={`focus:outline-none transform hover:bg-pink hover:text-dark hover:scale-95 duration-500 h-10 px-3 ${
                index === 0 ? 'mr-2' : 'mx-4'
              } ${
                button.backgroundColor ||
                'text-pink  px-5 w-6/12 border border-pink'
              } rounded-md`}
              onClick={() =>
                button.handleClick
                  ? button.handleClick(handleClose)
                  : handleClose()
              }
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
