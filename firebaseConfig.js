import { initializeApp } from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyChENlQHvKCfVD5pUmn9tEd19C3L94zFp8",
    authDomain: "calorie-and-workout-tracker.firebaseapp.com",
    projectId: "calorie-and-workout-tracker",
    storageBucket: "calorie-and-workout-tracker.appspot.com",
    messagingSenderId: "1017571202644",
    appId: "1:1017571202644:web:d443575152ab648cd53fc1"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
