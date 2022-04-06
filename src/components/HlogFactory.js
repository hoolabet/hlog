import React, { useState } from "react";
import { storageService, dbService } from "../fbase";
import { ref, uploadString , getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";


const HlogFactory = ({userObj}) => {
    const [Hlog,setHlog] = useState("");
    const [attachment,setAttachment] = useState("");

    const onSubmit = async(event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef,attachment,"data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const HlogObj = {
            text:Hlog,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService,"Hlogs"),HlogObj);
        
        setHlog("");
        setAttachment("");
    };
    const onChange = (event) => {
        const { target:{value},} = event;
        setHlog(value);
    };
    const onFileChange = (event) => {
        const {target: {files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget:{result},} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachmentClick = () => {
        setAttachment("");
    };

    return (
        <form onSubmit={onSubmit}>
            <input 
                value={Hlog}
                onChange={onChange}
                type="text" 
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input 
                type="file"
                accept="image/*"
                onChange={onFileChange}
            />
            <input 
                type="submit"
                value="Hlog"
            />
            {attachment && 
                <div>
                    <img src={attachment} width="100px" height="100px" />
                    <button onClick={onClearAttachmentClick}>Clear</button>
                </div>
            }
        </form>)
};

export default HlogFactory;