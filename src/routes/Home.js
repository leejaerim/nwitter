import { collection, addDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {dbService, storageRef} from "../fbase";
import Nweet from "../components/Nweet";
import {ref, uploadString,getDownloadURL} from "firebase/storage";
import NweetFactory from "../components/NweetFactory";

const Home = ({ userobj }) => {
    const [nweets, setNweets] = useState([]);
    //older one.
    // const getNweets = async _ => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     //get Query SnapShot.
    //     dbNweets.forEach((dbNweet) => {
    //         //implict property(prev)
    //         const nweetObj = {
    //             ...dbNweet.data(),
    //             id: dbNweet.id,
    //         };
    //         setNweets(prev => [nweetObj, ...prev])
    //     }
    //     );
    // }
    useEffect(() => {
        //getNweets();
        onSnapshot(collection(dbService, "nweets"), obj => {
            setNweets(obj.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })));
        })
    }, []);
    return (
        <div>
            <NweetFactory userobj={userobj}/>
            <div>
                {nweets.map((nweet) => <Nweet key={nweet.id} nweetobj={nweet} isOwner={nweet.creatorId === userobj.uid}></Nweet>)}
            </div>
        </div>

    )
}

export default Home;