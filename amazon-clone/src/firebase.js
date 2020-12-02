import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCQstxox6__FF32rsnSP0pAka9BRprSz-U",
    authDomain: "clone-3e0ac.firebaseapp.com",
    databaseURL: "https://clone-3e0ac.firebaseio.com",
    projectId: "clone-3e0ac",
    storageBucket: "clone-3e0ac.appspot.com",
    messagingSenderId: "237465099348",
    appId: "1:237465099348:web:674f4fb2bed566da2c61c1",
    measurementId: "G-CGF2XDPTPK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth}

