import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React ,{ useState } from "react";
import { AuthService} from "../fbase";
import AuthForm from "../components/AuthForm";

const Auth=() => {
    const onSocialClick = async (e)=>{
        const {target : {name} } = e
        let provider;
        
        if(name === "google"){
            //do Something.
            // provider = new firebaseInstance.GoogleAuthProvider();
            provider = new GoogleAuthProvider()
            const data = await signInWithPopup(AuthService,provider)
            console.log(data)
        }
    }
    return(
        <div>
            <AuthForm/>
        <div>
            <button name="google" onClick={onSocialClick}> Continue with Google</button>
            <button name="github" onClick={onSocialClick}> Continue with Github</button>
        </div>
        </div>
    );
}

export default Auth;
