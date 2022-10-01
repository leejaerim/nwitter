
import React, { useEffect, useState } from "react";
import AppRouter from "./Router"
import {AuthService} from "../fbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  useEffect(()=>{
    AuthService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initalizing wait a seconds..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  )
    
}

export default App;
