import { createSelector } from 'redux-bundler';

import AdminWrapper from '../components/views/wrappers/AdminWrapper';
import UserWrapper from '../components/views/wrappers/UserWrapper';
import NoWrapper from '../components/views/wrappers/NoWrapper';

export const roleHomeRedirect = role => {
  switch (role) {
    case 'ADMIN':
      return '/dashboard';
    case 'POC':
      return '/labs-studies';
    default:
      return '/login';
  }
};

export default {
  name: 'nav',
  selectNavLinks: createSelector(
    'selectUserRole',
    'selectRoutes',
    (userRole, routes) => {
      if (routes) {
        return Object.keys(routes).reduce((acc, route) => {
          const routeInfo = routes[route].value;
          if (
            routeInfo.mainNav &&
            ((routeInfo.roles && routeInfo.roles.includes(userRole)) || !routeInfo.roles)
          ) {
            acc.push({
              url: route,
              label: routeInfo.mainNav.label || routeInfo.title,
              icon: routeInfo.mainNav.icon || routeInfo.icon,
              ...routeInfo.mainNav,
            });
          }
          return acc;
        }, []);
      }
    },
  ),
  selectLayoutWrapper: createSelector(
    'selectUserRole',
    'selectRoute',
    (userRole, route) => {
      if (route.wrapper) {
        return route.wrapper;
      }
      switch (userRole) {
        case 'ADMIN':
          return AdminWrapper;
        case 'POC':
          return UserWrapper;
        default:
          return NoWrapper;
      }
    },
  ),
  selectUserAuthorized: createSelector(
    'selectUserRole',
    'selectRoute',
    (userRole, route) => (route.roles ? route.roles.includes(userRole) : true),
  ),
  reactShouldRedirectRestricted: createSelector(
    'selectUserRole',
    'selectUserAuthorized',
    (userRole, userAuthorized) => {
      if (!userAuthorized) {
        return { actionCreator: 'doUpdateUrl', args: [roleHomeRedirect(userRole)] };
      }
    },
  ),
  reactShouldRedirectHome: createSelector(
    'selectUserRole',
    'selectUrlObject',
    (userRole, urlObject) => {
      if (urlObject.pathname === '/') {
        return { actionCreator: 'doUpdateUrl', args: [roleHomeRedirect(userRole)] };
      }
    },
  ),
};
