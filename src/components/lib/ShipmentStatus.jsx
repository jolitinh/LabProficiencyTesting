import React from 'react';

/**
 * Render the status of the POC
 * @type {React.Component}
 * @param {number} shippmentStatus    Poc status ID
 * @param {Object} status Status Object of the POC
 * @return {React.Component}
 */
const ShipmentStatus = ({ shipmentStatus }) => {
  /**
   * Status Object to map status to bagde classes
   * @type {Object}
   */

  const statuses = {
    SHIPPED: { label: 'Shipped', classStatus: 'secondary' },
    PENDING: { label: 'Pending', classStatus: 'warning' },
    // 3: { label: '', classStatus: 'info' },
    RECEIVED: { label: 'Received', classStatus: 'success' },
    // 5: { label: '', classStatus: 'danger' },
  };

  return shipmentStatus ? (
    <span className={`badge badge-soft-${statuses[shipmentStatus].classStatus}`}>
      {statuses[shipmentStatus].label}
    </span>
  ) : (
    <span className="badge badge-soft-dark text-center">No data provided</span>
  );
};

export default ShipmentStatus;
