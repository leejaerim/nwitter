
import React, { useEffect, useState } from "react";
import AppRouter from "./Router"
import { AuthService } from "../fbase";
import {updateProfile} from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  const [userobj, setUserObj] = useState(null);
  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args)=> updateProfile(user,{displayName:user?.displayName, photoURL:user?.photoURL, uid:user?.uid}),
          //updateProfile: (args)=> user.updateProfile(args),
        });
        //setUserObj(user)
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  const refreshUser = ()=>{
    //currentUser 자체가 큰 오브젝트로 react가 리랜더링에
    const user = AuthService.currentUser
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args)=> updateProfile(user,{displayName:user?.displayName, photoURL:user?.photoURL, uid:user?.uid}),
    })
    //setUserObj(Object.assign({},user));
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userobj={userobj} /> : "Initalizing wait a seconds..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  )

}

export default App;
