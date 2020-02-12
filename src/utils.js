export const getApproxTime = time => Math.max(0, Math.round(time));

export const isNumber = value => !Number.isNaN(parseInt(value, 10));

export const initialValueForOptionsDataList = (options, value, inputValue) => {
  const optionsIds = [];
  options.forEach(op => {
    optionsIds.push(op.id);
  });

  if (isNumber(value) && optionsIds.includes(value)) {
    const [{ name }] = options.filter(op => op.id === value);
    return name;
  }
  if (!isNumber(value)) {
    return inputValue;
  }
};
export const searchIdFromOptions = (options, value) => {
  let isTheValueFound = false;
  if (!isNumber(value)) {
    options.forEach(op => {
      if (op.name === value) {
        isTheValueFound = true;
      }
    });
    if (!isTheValueFound) {
      return value;
    }
    const [{ id }] = options.filter(op => op.name === value);
    return id;
  }
  return value;
};

export const uuidv4 = (a, b) => {
  for (
    b = a = '';
    a++ < 36;
    b +=
      ~a % 5 | ((a * 3) & 4)
        ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16)
        : '-'
  );
  return b;
};

/**
 * Build the response object from server in a standar way
 * to have message, statusCode, errors (if any) properties
 * @param {Object} err   Axios err.response object
 * @return {Object}
 */
export const getApiError = err => {
  const {
    data: {
      error: { errors, message },
    },
    status,
  } = err;

  return { statusCode: status, message, errors };
};

export const statusActionsTypes = {
  REGISTRATION_INVITATION: 'REGISTRATION_INVITATION',
  REGISTRATION_INVITATION_CANCEL: 'REGISTRATION_INVITATION_CANCEL',
  REVOKE_ACCESS: 'REVOKE_ACCESS',
  RESTORE_ACCESS: 'RESTORE_ACCESS',
  ACCOUNT_RESET_PASSWORD: 'ACCOUNT_RESET_PASSWORD',
};

export const actionAlertMessagesAndTitle = {
  [statusActionsTypes.REGISTRATION_INVITATION]: {
    msg: 'New users invited successfully!',
    title: 'Invitations Sent',
    errTitle: 'Error on Inviting Users',
    errMsg: 'The users cannot be invited',
  },
  [statusActionsTypes.REGISTRATION_INVITATION_CANCEL]: {
    msg: `User's invitations have been canceled`,
    title: 'Invitations Canceled',
    errTitle: 'Error on Cancel Users Invitation',
    errMsg: 'The users invitation cannot be removed',
  },
  [statusActionsTypes.REVOKE_ACCESS]: {
    msg: `User's access have been revoked`,
    title: 'Access Revoked for these users',
    errTitle: 'Error on Revoking Users Access',
    errMsg: 'The users access cannot be removed',
  },
  [statusActionsTypes.RESTORE_ACCESS]: {
    msg: `User's access have been granted`,
    title: 'Access Granted for these users',
    errTitle: 'Error on granting users access',
    errMsg: 'The users access cannot be granted',
  },
};

export const formatedShortDate = timestamp => {
  const month = new Date(timestamp).toLocaleString('default', { month: 'short' });
  const day = new Date(timestamp).toLocaleString('default', { day: '2-digit' });
  const formatedDate = `${month} ${day}`;
  return formatedDate;
};

export const formatedLongDate = timestamp => {
  const month = new Date(timestamp).toLocaleString('default', { month: 'long' });
  const day = new Date(timestamp).toLocaleString('default', { day: '2-digit' });
  const year = new Date(timestamp).toLocaleString('default', { year: 'numeric' });
  const formatedDate = `${month} ${day}, ${year}`;
  return formatedDate;
};

export const submitActionTypes = {
  INVITE_USERS: 'INVITE_USERS',
  CANCEL_INVITATION_USERS: 'CANCEL_INVITATION_USERS',
  DEACTIVATE_USERS: 'DEACTIVATE_USERS',
  ACTIVATE_USERS: 'ACTIVATE_USERS',
};

export const getChunkArray = (array, size) => {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }
  return chunked;
};

export const panelShippingStatus = {
  PENDING: 'PENDING',
  SHIPPED: 'SHIPPED',
  RECEIVED: 'RECEIVED',
};
