import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAoKGEw2t6ceyI2Fb7CPiwqCWrGxiGBsJo",
  authDomain: "accountbook-536c5.firebaseapp.com",
  databaseURL: "https://accountbook-536c5.firebaseio.com",
  projectId: "accountbook-536c5",
  storageBucket: "accountbook-536c5.appspot.com",
  messagingSenderId: "94373072717"
};

firebase.initializeApp(config);

export default firebase;

export const initFirebase = () => {
  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};
export const database = firebase.database();
export const auth = firebase.auth();
export const google = () => new firebase.auth.GoogleAuthProvider();