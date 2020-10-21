import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import CallbackPage from './components/callback/CallbackPage';
import ProfilePage from './components/profile/ProfilePage';

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetch-data/:startDateIndex?" component={FetchData} />

    <Route path="/profile" component={ProfilePage} />
    <Route path="/callback" component={CallbackPage} />
  </Layout>
);
