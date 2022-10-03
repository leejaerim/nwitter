import { collection, addDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";

const Home = ({ userobj }) => {
    const [nweet, setNweet] = useState('');
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

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createAt: Date.now(),
                creatorId: userobj.uid,
            })
        } catch (e) {
        }
        setNweet('');
    }
    const onChange = ({ target: { value } }) => {
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} value={nweet} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => <Nweet key={nweet.id} nweetobj={nweet} isOwner={nweet.creatorId === userobj.uid}></Nweet>)}
            </div>
        </div>

    )
}

export default Home;