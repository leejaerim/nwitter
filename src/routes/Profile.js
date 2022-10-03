import { onLog } from "firebase/app";
import React from "react";
import {useNavigate} from "react-router-dom";
import { AuthService } from "../fbase";

export default () => {
    const navi = useNavigate();
    const onLogoutClick=_=>{
        AuthService.signOut();
        navi("/");
    }
    return (
        <>
            <button onClick={onLogoutClick}>Logout</button>
        </>
    )
}