import { useState } from 'react';

const useModal = () => {
  const [showing, setVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [edit, setMode] = useState(false);
  const EDIT_MODE = true;
  const CREATE_MODE = false;

  const toggleVisibility = () => {
    setVisibility(!showing);
  };

  const setModalTitle = modalTitle => {
    setTitle(modalTitle);
  };

  const setModalMode = mode => {
    if (mode) {
      setMode(EDIT_MODE);
    } else {
      setMode(CREATE_MODE);
    }
  };

  return { showing, toggleVisibility, edit, setModalMode, title, setModalTitle };
};

export default useModal;
