import React, { useState, useEffect } from 'react';

const Col = props => {
  const [gridCustomClass, setGridCustomClass] = useState('');

  useEffect(() => {
    const buildCustomClass = () => {
      let gridProperties = '';
      Object.keys(props).forEach(prop => {
        switch (prop) {
          case 'sm':
            gridProperties += `col-sm-${props[prop]} `;
            break;

          case 'md':
            gridProperties += `col-md-${props[prop]} `;
            break;

          case 'lg':
            gridProperties += `col-lg-${props[prop]} `;
            break;

          case 'xl':
            gridProperties += `col-xl-${props[prop]} `;
            break;

          case 'col':
            gridProperties += `col-${props[prop]} `;
            break;

          case 'className':
            gridProperties += `${props[prop]} `;
            break;
          default:
        }
      });
      setGridCustomClass(gridProperties);
    };

    buildCustomClass();
  }, [props]);

  const { children } = props;
  return <div className={`${gridCustomClass} `}>{children}</div>;
};

export default Col;
