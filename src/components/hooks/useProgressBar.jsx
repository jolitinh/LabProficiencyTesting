import React from 'react';

const useProgressBar = () => {
  const Progress = ({ progress, isSuccesValue }) => {
    return (
      <div className="row align-items-center no-gutters">
        <div className="col-auto">
          <span className="h5 mr-2 mb-0">{`${progress}%`}</span>
        </div>
        <div className="col">
          <div className="progress progress-sm">
            <div
              className={`progress-bar ${isSuccesValue ? 'progress-bar bg-success' : ''}`}
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
    );
  };

  return [Progress];
};

export default useProgressBar;
