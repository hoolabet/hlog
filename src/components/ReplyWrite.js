import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "../fbase";

const ReplyWrite = ({HlogObj,userObj,D,H}) => {
    let isEnter;
    const [re,setRe] = useState("");
    const onSubmit = async(event) => {
        event.preventDefault();
        
        const reply = {
            text:re,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            creatorNick: userObj.displayName,
        };
        await addDoc(collection(dbService,`Hlogs/${H}/reply`),reply);
        setRe("");
    };
    const onChange = (event) => {
        const { target:{value},} = event;
        isEnter = value;
        if(value.keyCode == 13){
            isEnter += isEnter + '\n';
        }
        setRe(isEnter);
    };
    return (
        <form onSubmit={onSubmit}>
                <textarea 
                    value={re}
                    onChange={onChange} 
                    placeholder="What's on your mind?"
                    required
                    cols={50}
                    rows={3}
                >
                </textarea>
                <input 
                    type='submit' 
                    value='reply'
                />
        </form>
    );
};

export default ReplyWrite;