
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fbase";

const Nweet = ({ nweetobj, isOwner }) => {
    const [editting, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetobj.text);

    const NweetTextRef = doc(dbService, "nweets", `${nweetobj.id}`);
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewNweet(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(NweetTextRef, { text: newNweet });
        setEditing(false);

    }
    const onDeleteClick = async () => {
        const confirm_ok = window.confirm("delete this?");
        if (confirm_ok) {
            await deleteDoc(NweetTextRef)
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    return (
        <div>
            {
                editting ?
                    <form onSubmit={onSubmit}>
                        <input value={newNweet} required onChange={onChange} />
                        <input type="submit" value="update NewNweet" ></input>
                        <button onClick={toggleEditing}>Cancel</button>
                    </form> : <><h4>{nweetobj.text}</h4></>
            }
            {isOwner ? <><button onClick={toggleEditing}>EditNweet</button>
                <button onClick={onDeleteClick}>DeleteNweet</button>
            </> : ""}

        </div>
    )

}

export default Nweet;