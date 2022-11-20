import { initializeApp } from "firebase/app";

import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt:'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,googleProvider)
export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth)=>{
  if(!userAuth) return
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

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
};