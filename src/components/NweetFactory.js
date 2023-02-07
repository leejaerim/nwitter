import React, {useState} from "react";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {dbService, storageRef} from "../fbase";
import {addDoc, collection} from "firebase/firestore";

const NweetFactory =({userobj})=>{
    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment != ""){
            const filename = 'test'
            const testRef = ref(storageRef,filename)
            const upload_result = await uploadString(testRef,attachment,'data_url')
            attachmentUrl =  await getDownloadURL(upload_result.ref)

        }
        const nweet_target = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userobj.uid,
            attachmentUrl,
        }
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), nweet_target)
        } catch (e) {
        }
        setNweet('');
        setAttachment('');
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
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} value={nweet} />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            {attachment && <div><img width={"50px"} height={"50px"} src={attachment}/><button onClick={onClearAttachment}>Clear</button></div>}
            <input type="submit" value="Nweet" />
        </form>
    )
}
export default NweetFactory;