import {auth} from '../firebase';
import {signInAnonymously} from 'firebase/auth';

export function signIn() {
  return signInAnonymously(auth);
}
