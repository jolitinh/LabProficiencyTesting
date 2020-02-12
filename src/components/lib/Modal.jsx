import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 *
 * @param {boolean}         showing  The flag to render the component
 * @param {function}        hide     The function to close the modal
 * @param {string}          title    The title of the modal
 * @param {boolean}         edit     Can be use to know modal mode (unused)
 * @param {React.Component} children The component to render as prop
 */
const createBaseModal = WrappedComponent => ({ showing, ...props }) => {
  const addModalClassCallback = useCallback(() => {
    if (showing) {
      document.getElementsByTagName('body')[0].classList = 'modal-open';
    }
  }, [showing]);

  useEffect(() => {
    addModalClassCallback();
  }, [addModalClassCallback]);

  useEffect(() => {
    if (!showing && document.getElementsByTagName('body')[0].classList.contains('modal-open')) {
      document.getElementsByTagName('body')[0].classList = '';
    }
  }, [showing]);

  return showing
    ? createPortal(
        <>
          <div className="modal-backdrop fade show" />
          <WrappedComponent {...props} />
        </>,
        document.body,
      )
    : null;
};

const Centered = ({ hide, title, error, children }) => (
  <div
    className="modal fade show"
    style={{ display: 'block' }}
    id="modalElement"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="modalElement"
    aria-modal="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={hide}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Vertical = ({ hide, title, error, children }) => (
  <div
    className="modal fade fixed-right show"
    id="modalDemo"
    tabIndex="-1"
    role="dialog"
    aria-modal="true"
    style={{ display: 'block' }}
  >
    <div className="modal-dialog modal-dialog-vertical" role="document">
      <div className="modal-content" id="demoForm">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={hide}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default {
  Vertical: createBaseModal(Vertical),
  Centered: createBaseModal(Centered),
};
