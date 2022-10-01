import React from "react";

import { BrowserRouter, Routes, HashRouter as Router, Route } from "react-router-dom";
import Auth from '../routes/Auth'
import Home from '../routes/Home'
const AppRouter =({isLoggedIn}) => {
    // <> -> fragment 많은 요소를 랜더링 하고 싶을 때 사용합니다.
    return (
        <BrowserRouter>
            <Routes>
            {isLoggedIn ? (<><Route exact path="/" element={<Home></Home>}></Route></>) :(<><Route exact path="/" element= {<Auth></Auth>}></Route></>)}
            </Routes>
        </BrowserRouter>
    )
}


export default AppRouter;
