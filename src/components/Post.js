import React from "react";
import { useLocation } from "react-router-dom";

const Post = ({HlogObj,userObj}) => {
    const location = useLocation();
    console.log(location);
    return(
        <div>
            <h1>{location.state.title}</h1>
            <h2 style={{whiteSpace:'pre-wrap'}}>{location.state.text}</h2>
            {location.state.url ? <img src={location.state.url} width={200}/> : <span></span>}
        </div>
    );
};

export default Post;