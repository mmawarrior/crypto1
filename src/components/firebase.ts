// src/firebase.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDTrQz4NrZIR4gPHq8ZoSuF6JLy11qMsG4",
  authDomain: "chat-5373e.firebaseapp.com",
  databaseURL: "https://chat-5373e-default-rtdb.firebaseio.com",
  projectId: "chat-5373e",
  storageBucket: "chat-5373e.appspot.com",
  messagingSenderId: "366393039973",
  appId: "1:366393039973:web:3497a4c430da2500963a8c",
  measurementId: "G-03MEDHVD53"
};

// Check if a Firebase instance already exists, if not, initialize one
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
