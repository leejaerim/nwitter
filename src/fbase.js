import {initializeApp} from "firebase/app"
import "firebase/auth";
import * as firebase from 'firebase';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
};

//export default firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const AuthService = getAuth(app);