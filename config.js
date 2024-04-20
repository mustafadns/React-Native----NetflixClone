import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCUwmPL84PrlOUu5gSPzfSMN38FrwfBYQU",
    authDomain: "netflixclone-1b7cb.firebaseapp.com",
    databaseURL: "https://netflixclone-1b7cb-default-rtdb.firebaseio.com",
    projectId: "netflixclone-1b7cb",
    storageBucket: "netflixclone-1b7cb.appspot.com",
    messagingSenderId: "342523061345",
    appId: "1:342523061345:web:939e4ddb0b28b075cb7620"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };