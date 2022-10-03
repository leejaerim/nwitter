import React from "react";

const Nweet = ({ nweetobj, isOwner }) => (
    <div>
        <h4>{nweetobj.text}</h4>
        {isOwner ? <><button>EditNweet</button>
            <button>DeleteNweet</button>
        </> : ""}

    </div>

)

export default Nweet;