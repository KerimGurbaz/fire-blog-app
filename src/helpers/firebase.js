import { initializeApp } from "firebase/app";

import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'

import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBCCGMfLDF8-PEut5zdEPPGjD5tN_I8bxA",
  authDomain: "fire-blog-app-b3000.firebaseapp.com",
  projectId: "fire-blog-app-b3000",
  storageBucket: "fire-blog-app-b3000.appspot.com",
  messagingSenderId: "611460851501",
  appId: "1:611460851501:web:d668e7ba6974160e59d5a4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth)=>{
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);


  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef;
}

