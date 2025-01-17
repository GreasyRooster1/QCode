import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC1GB-hiznIqC51ppB23rIgHSIRM0MT9B8",
    authDomain: "qcode-cdfc6.firebaseapp.com",
    databaseURL: "https://qcode-cdfc6-default-rtdb.firebaseio.com",
    projectId: "qcode-cdfc6",
    storageBucket: "qcode-cdfc6.appspot.com",
    messagingSenderId: "880821739173",
    appId: "1:880821739173:web:7f68b987c9a53e49bb374c",
    measurementId: "G-E5DHM57W13"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export {app, database,auth};