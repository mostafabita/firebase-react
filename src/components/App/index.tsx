import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import DashboardMasterPage from '../DashboardMaster';

import { config as firebaseConfig } from '../../config/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';

const App = () => (
  <React.Fragment>
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirestoreProvider firebase={firebase} {...firebaseConfig}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/dashboard" component={DashboardMasterPage} />
          </Switch>
        </BrowserRouter>
      </FirestoreProvider>
    </FirebaseAuthProvider>
  </React.Fragment>
);

export default App;
