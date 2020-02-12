import React from 'react';
import { connect } from 'redux-bundler-react';

const Toasts = ({ toastList, doClearAlerts }) => (
  <div
    style={{
      position: 'fixed',
      top: 30,
      right: 10,
    }}
  >
    {toastList.map((toast, id) => (
      <div
        key={toast.id}
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: 'relative',
          zIndex: id * 12,
          opacity: 1,
          minWidth: '300px',
        }}
      >
        <div className="toast-header">
          <h4 className="mb-0 mr-auto">{toast.title}</h4>
          {/* <small className="text-muted">2 mins ago</small> TODO: save this for later... */}
          <button
            onClick={() => doClearAlerts([toast.id])}
            type="button"
            className="ml-3 mb-n1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="toast-body">{toast.msg}</div>
      </div>
    ))}
  </div>
);

export default connect('doClearAlerts', Toasts);
