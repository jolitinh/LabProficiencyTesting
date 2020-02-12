import React from 'react';

import Modal from './Modal';
import useModal from '../hooks/useModal';

/**
 * Reusable component to show a message or execute a parent method
 * If no action props is passed we treat this component as information only
 * @param {function} action The parent action to execute
 * @param {string}   confirmText The text to show on the submit action
 * @param {string}   confirmButtonClass The btn class for the submit button
 * @param {string}   cancelText        The text for the cancel button action
 * @param {string}   modalTitle   The modal's title
 * @param {string}   bodyText  The modal body text
 * @param {string}   icon      icon class for the button action that popup the modal
 * @param {ComponentProps}    props  Extra props
 */
const ConfirmActionButton = ({
  action,
  bodyText,
  cancelText,
  children,
  className,
  confirmText,
  confirmButtonClass,
  disabled,
  icon,
  modalTitle,
}) => {
  const { showing, toggleVisibility, setModalTitle, title } = useModal();

  const callModal = () => {
    setModalTitle(modalTitle || 'Are you sure?');
    toggleVisibility();
  };

  const submitAction = () => {
    if (action) {
      action();
    }
    toggleVisibility();
  };

  return (
    <>
      <button
        type="button"
        className={className || 'btn btn-link p-0'}
        aria-haspopup="true"
        onClick={callModal}
        disabled={disabled}
        title={title}
      >
        {children || <span className={`delete fe fe-${icon} text-danger`} />}
      </button>
      <Modal.Centered showing={showing} hide={toggleVisibility} title={title}>
        <p>{bodyText}</p>
        <button type="button" className={confirmButtonClass} onClick={submitAction}>
          {confirmText || 'Submit'}
        </button>
        {action && (
          <button type="button" className="btn btn-link" onClick={toggleVisibility}>
            {cancelText || 'Cancel'}
          </button>
        )}
      </Modal.Centered>
    </>
  );
};

export default ConfirmActionButton;
