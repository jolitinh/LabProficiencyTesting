import React from 'react';
import { Provider } from 'redux-bundler-react';
import getStore from './bundles';

import Layout from './components/Layout';

function App() {
  return (
    <Provider store={getStore()}>
      <Layout />
    </Provider>
  );
}

export default App;
