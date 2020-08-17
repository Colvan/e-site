import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA9OdjUyaL7GpoTYG1g4EvOYfccxCNiHfk",
  authDomain: "e-site-8aeb9.firebaseapp.com",
  databaseURL: "https://e-site-8aeb9.firebaseio.com",
  projectId: "e-site-8aeb9",
  storageBucket: "e-site-8aeb9.appspot.com",
  messagingSenderId: "1077957392000",
  appId: "1:1077957392000:web:32203440ea6584bb295865",
  measurementId: "G-HMLJQ8E017",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`/user/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user".error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
