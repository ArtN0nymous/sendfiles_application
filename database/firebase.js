import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig={
    apiKey: "AIzaSyB9agNsxmLGcFlfK_V-iNCp5vyYFT2WAio",
    authDomain: "practica-files-rn.firebaseapp.com",
    projectId: "practica-files-rn",
    storageBucket: "practica-files-rn.appspot.com",
    messagingSenderId: "183426919974",
    appId: "1:183426919974:web:43bef5bd194ae5be8080e7"
}
var app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth= app.auth();
export default{
    firebase,
    db,
    auth
}
