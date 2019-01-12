import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBKJ7MXG9lnqgkzBRaepZ01cyv4rndGGjk",
  authDomain: "memes-maker-28fe4.firebaseapp.com",
  databaseURL: "https://memes-maker-28fe4.firebaseio.com",
  projectId: "memes-maker-28fe4",
  storageBucket: "memes-maker-28fe4.appspot.com",
  messagingSenderId: "615513638310"
};
firebase.initializeApp(config);

export default firebase.database();
