import React from 'react';

/**
 * Render the status of the POC
 * @type {React.Component}
 * @param {number} pocStatus    Poc status ID
 * @param {Object} status Status Object of the POC
 * @return {React.Component}
 */
const AccessStatus = ({ pocStatus, status }) => {
  /**
   * Status Object to map status to bagde classes
   * @type {Object}
   */
  const statuses = {
    1: { id: 1, classStatus: 'secondary' },
    2: { id: 2, classStatus: 'warning' },
    3: { id: 3, classStatus: 'info' },
    4: { id: 4, classStatus: 'success' },
    5: { id: 5, classStatus: 'danger' },
  };

  return pocStatus && status ? (
    <span className={`badge badge-soft-${statuses[pocStatus].classStatus}`}>{status.name}</span>
  ) : (
    <span className="badge badge-soft-dark">No data provided</span>
  );
};

export default AccessStatus;
