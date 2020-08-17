import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';

export class AuthService {
  static instance: any = null;
  private history = useHistory();
  private provider: any;

  constructor() {
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  static createInstance() {
    return new AuthService();
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = AuthService.createInstance();
    }
    return AuthService.instance;
  }

  get currentUser(): firebase.User | null {
    return firebase.auth().currentUser;
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
    this.history.push('/');
  }
}

export default AuthService;
