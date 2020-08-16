import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';

export class AuthService {
  private history = useHistory();
  private provider: any;

  constructor() {
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  async signInWithGoogle() {
    const credential = await firebase.auth().signInWithPopup(this.provider);
    if (credential.user !== undefined) {
      this.history.push('/dashboard');
    }
    return credential;
  }

  async logout() {
    await firebase.auth().signOut();
  }
}
