/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

/**
 *
 * @param {String} name
 * @param {String} field
 * @param {Object} actions An object where is mapped the status, text, type
 * @param {Function} onClickAction Submit function when the user click on one of the list
 * @param {String} key This is the key for the payload for the onClickAction function
 * @param {String} keyForAction This is the field where the actions will match for the function
 */
const useActionFieldForTable = (name, field, actions, onClickAction, key, keyForAction) => {
  const ActionsList = ({ item, onClickActionCb }) => {
    return actions[item[keyForAction]].length ? (
      <div className="dropdown">
        <p
          className="dropdown-ellipses dropdown-toggle mb-0"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fe fe-menu" />
        </p>
        <ul className="dropdown-menu dropdown-menu-right">
          {actions[item[keyForAction]].map(res => {
            return (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={`action-${res.text}`}
                className="dropdown-item btn text-sm"
                onClick={() => onClickActionCb([item[key]], res.type)}
              >
                {res.text}
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <span className="text-center text-muted">No Actions Available</span>
    );
  };

  return [
    {
      name,
      field,
      actions,
      onClickAction,
      func: item => <ActionsList item={item} onClickActionCb={onClickAction} />,
    },
  ];
};

export default useActionFieldForTable;
