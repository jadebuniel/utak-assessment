// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDIgqpMYQyGyG0HzC_ecG3NPEiN044RUE4',
  authDomain: 'utak-2ddd2.firebaseapp.com',
  projectId: 'utak-2ddd2',
  storageBucket: 'utak-2ddd2.appspot.com',
  messagingSenderId: '1089584068658',
  appId: '1:1089584068658:web:58d11bc39d9da24f57a42b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
