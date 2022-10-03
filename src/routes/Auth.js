import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React ,{ useState } from "react";
import { AuthService} from "../fbase";

const Auth=() => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) =>{
        const {target : {name, value}} = e;
        if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }
    const onSubmit =async (e)=>{
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                //create Account
                data = await createUserWithEmailAndPassword(AuthService, email,password);
                
            }else{
                //login
                data = await signInWithEmailAndPassword(AuthService,email,password);
            }
            console.log(data)
        }catch(e){
            setError(e.message);
        }
        
    }
    const toggleAccount = ()=>{
        setNewAccount(prev=>!prev);
    }
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
        <div>
            <form onSubmit={onSubmit}>
                <input name="email"type="email" placeholder="Eamil" required value={email} onChange={onChange}>
                </input>
            <input name="password" type="password" placeholder="Eamil" required value={password}onChange={onChange}> 
                </input>
                <input type="submit" value={newAccount ? "Create Account" : "Login"}/>
            </form>
            {error}
        </div>
        <span onClick={toggleAccount}> {newAccount ? "Login" : "Join in" } </span>
        <div>
            <button name="google" onClick={onSocialClick}> Continue with Google</button>
            <button name="github" onClick={onSocialClick}> Continue with Github</button>
        </div>
        </div>
    );
}

export default Auth;
