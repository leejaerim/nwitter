import { collection, addDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";

const Home = ({ userobj }) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState('');
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
    const onFileChange = (e) =>{
        const {target:{files}} = e;
        const theFile = files[0];
        //using file reader API
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent
            setAttachment(result);
        }
        reader.readAsDataURL(theFile)


    }
    const onClearAttachment =()=>{
        setAttachment('')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} value={nweet} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                {attachment && <div><img width={"50px"} height={"50px"} src={attachment}/><button onClick={onClearAttachment}>Clear</button></div>}
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => <Nweet key={nweet.id} nweetobj={nweet} isOwner={nweet.creatorId === userobj.uid}></Nweet>)}
            </div>
        </div>

    )
}

export default Home;