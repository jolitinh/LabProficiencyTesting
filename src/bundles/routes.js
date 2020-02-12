import { createRouteBundle } from 'redux-bundler';
import MainDashboard from '../components/pages/MainDashboard';
import LabEditPage from '../components/pages/LabEditPage';
import LabNewPage from '../components/pages/LabNewPage';
import LabParticipantsTable from '../components/views/LabParticipantsTable';
import UserList from '../components/pages/UserList';
import EiaResults from '../components/test-results/EiaResults';
import TestResults from '../components/test-results/TestResults';
import GenotypingResults from '../components/test-results/GenotypingResults';
import UserVerification from '../components/pages/UserAccountVerification';
import UserProfile from '../components/pages/UserProfile';
import AdminStudyDetailPage from '../components/pages/AdminStudyDetailPage';
import ListingStudies from '../components/pages/ListingStudies';
import SubmitTestsPage from '../components/pages/SubmitTestsPage';
import PocShippingAddress from '../components/pages/PocShippingAddress';
import PanelVerification from '../components/lib/PanelVerification';

// auth
import Login from '../components/pages/Login';
import PasswordReset from '../components/pages/PasswordReset';
import NewPassword from '../components/pages/NewPassword';
import LaboratoryStudyPage from '../components/pages/LaboratoryStudyPage';
import NoWrapper from '../components/views/wrappers/NoWrapper';

import { roles } from '../helpers/constants';

export default createRouteBundle({
  '/dashboard': {
    title: 'Proficiency Testing',
    component: MainDashboard,
    mainNav: { label: 'Dashboard', icon: 'home' },
    roles: [roles.ADMIN],
  },
  '/labs': {
    title: 'Labs',
    component: LabParticipantsTable,
    mainNav: true,
    roles: [roles.ADMIN],
    icon: 'edit',
  },
  '/studies': {
    title: 'Studies',
    component: ListingStudies,
    mainNav: true,
    roles: [roles.ADMIN],
    icon: 'activity',
  },
  '/enrollment': {
    title: 'Kit Shipping Address',
    component: PocShippingAddress,
    roles: [roles.POC],
  },
  '/labs/new': { title: 'Add Lab', component: LabNewPage, roles: [roles.ADMIN] },
  '/labs/edit/:labId': {
    title: 'Edit Lab',
    component: LabEditPage,
    roles: [roles.ADMIN, roles.POC],
  },
  '/users': {
    title: 'Users',
    component: UserList,
    mainNav: true,
    roles: [roles.ADMIN],
    icon: 'user',
  },
  '/users/confirm-account': {
    title: 'User account confirmation',
    component: UserVerification,
    wrapper: NoWrapper,
  },
  '/users/new-password-request': {
    title: 'Password Reset',
    component: PasswordReset,
    wrapper: NoWrapper,
  },
  '/users/password-reset': {
    title: 'New Password',
    component: NewPassword,
    wrapper: NoWrapper,
  },
  '/login': {
    title: 'Login',
    component: Login,
    wrapper: NoWrapper,
  },
  '/test': {
    title: 'Test Dashboard',
    component: MainDashboard,
    mainNav: true,
    roles: [roles.ADMIN],
  },
  '/studies/:id': {
    title: 'Study Detail',
    component: AdminStudyDetailPage,
    roles: [roles.ADMIN],
  },
  '/eia-recording': {
    title: 'EIA Recording Sheet',
    component: EiaResults,
    mainNav: false,
    roles: [roles.ADMIN, roles.POC],
  },
  '/genotype-recording': {
    title: 'Genotyping Recording Sheet',
    component: GenotypingResults,
    mainNav: false,
    roles: [roles.ADMIN, roles.POC],
  },
  '/test-view-data': {
    title: 'View EIA Results',
    component: TestResults,
    mainNav: false,
    roles: [roles.ADMIN],
  },
  '/labs-studies': {
    title: 'Labs & Studies',
    component: LaboratoryStudyPage,
    mainNav: true,
    roles: [roles.POC],
    icon: 'folder',
  },
  '/enrolled-studies/:id/submit-tests': {
    title: 'Submit Tests',
    component: SubmitTestsPage,
    roles: [roles.POC],
    icon: 'folder',
  },
  '/profile': {
    title: 'My Profile',
    component: UserProfile,
    mainNav: true,
    roles: [roles.ADMIN, roles.POC],
    icon: 'settings',
  },

  '/enrolled-studies/:id': {
    title: 'Enrolled Studies',
    component: PanelVerification,
    roles: [roles.POC],
  },

  '*': { title: 'Page Not Found', component: MainDashboard, roles: [roles.ADMIN, roles.POC] },
});
