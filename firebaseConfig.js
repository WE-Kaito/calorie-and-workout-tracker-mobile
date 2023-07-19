import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyChENlQHvKCfVD5pUmn9tEd19C3L94zFp8",
    authDomain: "calorie-and-workout-tracker.firebaseapp.com",
    projectId: "calorie-and-workout-tracker",
    storageBucket: "calorie-and-workout-tracker.appspot.com",
    messagingSenderId: "1017571202644",
    appId: "1:1017571202644:web:d443575152ab648cd53fc1"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
