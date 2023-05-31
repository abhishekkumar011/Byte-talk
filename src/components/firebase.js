import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDvTraXejsY6fAJuaAqg5wQVIRdUKAMWI",
  authDomain: "byte-talk-990b4.firebaseapp.com",
  projectId: "byte-talk-990b4",
  storageBucket: "byte-talk-990b4.appspot.com",
  messagingSenderId: "712210169905",
  appId: "1:712210169905:web:c953e9eb746542068b9510",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
