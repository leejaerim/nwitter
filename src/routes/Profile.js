import { onLog } from "firebase/app";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService, dbService} from "../fbase";
import {collection, getDocs, query, where} from "firebase/firestore";
import {updateProfile} from "firebase/auth"
export default ({userobj}) => {
    const navi = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userobj.displayName);
    const onLogoutClick=_=>{
        AuthService.signOut();
        navi("/");
    }
    const onChange=(e)=>{
        const{
            target : {value},
        } = e;
        setNewDisplayName(value)
    }
    const getMyNweets = async() =>{
        const q = query(collection(dbService, "nweets"), where("creatorId", "==", userobj.uid));
        const MyNweets = await getDocs(q);
        //MyNweets.forEach(nweet =>  console.log(nweet.data()))
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        if(userobj.displayName !== newDisplayName){
            updateProfile(userobj,{
                displayName : newDisplayName,
                photoURL : userobj.photoURL
            }).then((e)=>console.log(e))
        }
    }
    useEffect(()=>{
        getMyNweets();
    },[])
    //console.log(userobj)
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type={"text"} onChange={onChange} placeholder={"Display name"} value={newDisplayName}/>
                <input type={"submit"} value={"Update Profile"}/>
            </form>
            <button onClick={onLogoutClick}>Logout</button>
        </>
    )
}