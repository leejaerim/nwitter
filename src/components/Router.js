import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter, Routes, HashRouter as Router, Route } from "react-router-dom";
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from "../routes/Profile";
const AppRouter = ({ refreshUser, isLoggedIn, userobj }) => {
    // <> -> fragment 많은 요소를 랜더링 하고 싶을 때 사용합니다.
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (<>
                    <Route exact path="/" element={<Home userobj={userobj}></Home>}>
                    </Route>
                    <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userobj={userobj}></Profile>}>
                    </Route>
                </>) :
                    (<>
                        <Route exact path="/" element={<Auth></Auth>}>
                        </Route>
                    </>)}
            </Routes>
        </BrowserRouter>
    )
}


export default AppRouter;
