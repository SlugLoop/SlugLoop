// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBLBiCaG4m35HpSltcoX6lkU1ud7ECSFm4',
  authDomain: 'slugloop-28347.firebaseapp.com',
  projectId: 'slugloop-28347',
  storageBucket: 'slugloop-28347.appspot.com',
  messagingSenderId: '220580866518',
  appId: '1:220580866518:web:8e3c3b0947c707aafa9c77',
  measurementId: 'G-343Y8DK4DG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
