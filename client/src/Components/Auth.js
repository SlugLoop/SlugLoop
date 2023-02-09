import {auth} from '../firebase';
import {signInAnonymously} from 'firebase/auth';
import {useEffect, useState} from 'react';

export function signIn() {
  return signInAnonymously(auth);
}

export function useAuthUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return user;
}
