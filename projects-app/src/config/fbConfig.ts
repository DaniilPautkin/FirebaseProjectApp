import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var firebaseConfig = {
  apiKey: "AIzaSyAyNghicodcOI6e1PLjCX0R8hHO3WTxAQY",
  authDomain: "fir-projectsapp.firebaseapp.com",
  databaseURL: "https://fir-projectsapp.firebaseio.com",
  projectId: "fir-projectsapp",
  storageBucket: "fir-projectsapp.appspot.com",
  messagingSenderId: "86051977377",
  appId: "1:86051977377:web:211c1b01f355ed9c5298e0",
  measurementId: "G-H4N8C7DNRR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase 