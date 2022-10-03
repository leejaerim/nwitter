
import React, { useEffect, useState } from "react";
import AppRouter from "./Router"
import { AuthService } from "../fbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  const [userobj, setUserObj] = useState(null);
  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userobj={userobj} /> : "Initalizing wait a seconds..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  )

}

export default App;
