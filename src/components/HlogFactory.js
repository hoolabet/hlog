import React, { useRef, useState } from "react";
import { storageService, dbService } from "../fbase";
import { ref, uploadString , getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import styles from './HlogFactory.module.css';

const HlogFactory = ({userObj}) => {
    const [Hlog,setHlog] = useState("");
    const [attachment,setAttachment] = useState("");
    const [HlogT,setHlogT] = useState("");
    const [isWrite,setIsWrite] = useState(false);
    let isEnter;
    const imageInput = useRef();

    const onClickImageUpload = () => {
        imageInput.current.click();
    };

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
            title:HlogT,
        };
        await addDoc(collection(dbService,"Hlogs"),HlogObj);
        
        setHlog("");
        setHlogT("");
        setAttachment("");
        setIsWrite(false);
    };
    const onChange = (event) => {
        const { target:{value},} = event;
        isEnter = value;
        if(value.keyCode == 13){
            isEnter += isEnter + '\n';
        }
        setHlog(isEnter);
    };
    const onChangeT = (event) => {
        const { target:{value},} = event;
        setHlogT(value);
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
        <div>
            {isWrite ? (
                <>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text"
                        value={HlogT}
                        onChange={onChangeT} 
                        placeholder="Write title"
                        required
                    />
                    <br />
                    <br />
                    <textarea 
                        value={isEnter}
                        onChange={onChange} 
                        placeholder="What's on your mind?"
                        required
                        cols={50}
                        rows={20}
                    />
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        style={{display:"none"}}
                        ref={imageInput}
                    />
                    <input 
                        type="submit"
                        value="Hlog"
                        className={styles.write_button}
                    />
                    <button 
                        onClick={()=>{
                            setIsWrite(false);setHlog("");setHlogT("");}}
                            className={styles.write_button}
                        >Cancel</button>

                    {attachment && 
                        <div>
                            <img src={attachment} width="100px" height="100px" />
                            <button 
                                onClick={onClearAttachmentClick}
                                className={styles.write_button}
                            >Clear</button>
                        </div>
                    }
                </form>
                <button 
                    onClick={onClickImageUpload}
                    className={styles.write_button}    
                >Image</button>
                </>
            ):
              <>
                <button 
                    onClick={()=>setIsWrite(true)}
                    className={styles.write_button}
                >Write</button>
              </>
            }
        </div>
    );
};

export default HlogFactory;