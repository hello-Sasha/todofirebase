import React, {createContext, useContext, useEffect, useState} from "react";
import {getAuth, signInWithEmailAndPassword, browserLocalPersistence, signOut, createUserWithEmailAndPassword} from "firebase/auth";


const authContext =createContext({
  isAuthenticate:null,
  user: null,
  loginWithEmailAndPassword:()=>Promise.resolve(null),
  logOut:()=>Promise.resolve(null),
  signUpEp:()=>Promise.resolve(null),
});

export const useAuth=()=>useContext(authContext);

export const AuthContextProvider=({firebaseApp,children})=>{
  const [isAuthenticate, setIsAuthenticate] =useState(null);
  const [auth]=useState(getAuth(firebaseApp));
  const [user, setUser]=useState(null);

  const signUpEp=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }
  const logOut =()=>{
    return signOut(auth)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }
  const loginWithEmailAndPassword =(email,password)=> signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });

  useEffect(()=>{
    auth.setPersistence(browserLocalPersistence); //to save user to local storage
    auth.onAuthStateChanged((user)=>{
      if(user){
        setIsAuthenticate(true);
        setUser(user);
      } else {
        setIsAuthenticate(false);
        setUser(null);
      }
    })
  },[auth]);
  return (
    <authContext.Provider value={{
      isAuthenticate,
      user,
      loginWithEmailAndPassword,
      logOut,
      signUpEp
    }}>
      {children}
    </authContext.Provider>
  )
}