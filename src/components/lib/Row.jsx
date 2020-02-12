import React from 'react';

const Row = ({ className, children }) => {
  return <div className={`row ${className}`}>{children}</div>;
};

export default Row;
