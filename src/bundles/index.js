import { composeBundles } from 'redux-bundler';

import actions from './actions';
import auth from './auth/auth';
import passwordReset from './auth/passwordReset';
import alerts from './alerts';
import api from './lib/api';
import appIdle from './lib/app-idle';
import routes from './routes';
import nav from './nav';
import labs from './labs';
import pocs from './pocs';
import user from './user';
import whoRegions from './whoRegions';
import accessStatus from './accessStatus';
import whoNetworkLabCategories from './whoNetworkLabCategories';
import countries from './countries';
import states from './states';
import studies from './studies';
import enrollment from './enrollment';

export default composeBundles(
  appIdle({ idleTimeout: process.env.NODE_ENV === 'production' ? 1000 : 15000 }),
  actions,
  alerts,
  api,
  labs,
  nav,
  pocs,
  routes,
  user,
  whoRegions,
  whoNetworkLabCategories,
  accessStatus,
  auth,
  passwordReset,
  countries,
  states,
  studies,
  enrollment,
);
