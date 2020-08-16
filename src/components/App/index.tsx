import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import DashboardMasterPage from '../DashboardMaster';

import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../config/firebase';
import { FirebaseAuthProvider } from '@react-firebase/auth';

const App = () => (
  <React.Fragment>
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/dashboard" component={DashboardMasterPage} />
        </Switch>
      </BrowserRouter>
    </FirebaseAuthProvider>
  </React.Fragment>
);

export default App;
