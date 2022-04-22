import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Reply from "./Reply";
import ReplyWrite from "./ReplyWrite";
import { dbService } from "../fbase";
import { collection ,query , orderBy, onSnapshot } from "firebase/firestore";



const Post = ({deleted,reply,HlogObj,userObj,Hlog}) => {
    const location = useLocation();
    const D = location.state.At;
    const H = location.state.H;

    const [replys,setReplys] = useState([]);
    const YD = new Date(D).getFullYear();
    const MD = new Date(D).getMonth()+1;
    const DD = new Date(D).getDate();
    const HD = new Date(D).getHours();
    const mD = new Date(D).getMinutes();
    useEffect(() => {
        const q = query(collection(dbService,`Hlogs/${H}/reply`),
        orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot) => {
            const replyArr = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setReplys(replyArr);
        });
    },[]);
    console.log(replys);
    return(
        <div>
            <div><h1>{location.state.title}</h1></div>
            <h4 style={{textAlign:'right'}}>{`${YD}-${MD}-${DD}  ${HD}:${mD}`}</h4>
            <h2 style={{whiteSpace:'pre-wrap'}}>{location.state.text}</h2>
            {location.state.url ? <img src={location.state.url} width={200}/> : <span></span>}
            
            <ReplyWrite userObj={userObj} D={D} H={H}/>
            <div>
            {replys.map((reply) => (
                <Reply 
                    D={D}
                    H={H}
                    key={reply.id} 
                    reply={reply}
                    replys={replys}
                    deleted={deleted} 
                    isOwner={reply.creatorId === userObj.uid}
                />
            ))}
        </div>
        </div>
    );
};

export default Post;
